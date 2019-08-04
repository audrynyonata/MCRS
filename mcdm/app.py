from flask import Flask, request
from flask_pymongo import PyMongo
from bson import json_util, ObjectId
import json

def separator():
  print("------------------------------------------------------------------------------------------------------------------")

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/mcrs"
mongo = PyMongo(app)

@app.route('/')
def index():
  return 'Welcome to MCDM!'

@app.route('/find', methods=['POST'])
def find():
  id = request.get_json()["project"]
  print("Receive request with id:", id)

  # fetch & preprocess
  project = mongo.db.projects.find_one_or_404({"id": id})
  projectCharacteristics = {p["id"] : p for p in project["characteristics"]}

  cnames = [*projectCharacteristics]

  # fetch & preprocess characteristics
  cursor = mongo.db.characteristics.find({"id": {"$in": cnames}})
  characteristics = {d["id"]:d for d in cursor}

  # fetch & preprocess methodchunks
  cursor = mongo.db.methodchunks.find({"characteristics.id": {"$in": cnames}})
  method_chunks = []
  for document in cursor: 
    document["characteristics"] = {d["id"] : d for d in document["characteristics"]}
    method_chunks.append(document)

  # create encoder
  from sklearn.preprocessing import OrdinalEncoder 
  for cid,pc in projectCharacteristics.items():
    if(pc["rule"] == "preference_list"):
      pass
    elif(pc["rule"] == "exact"):
      pass
    else: #maximum, minimum
      if (cid in characteristics):   
        for cv in characteristics[cid]["characteristicValues"]:
          if (cv["ref"] == pc["ref"]):
            if (pc["rule"] == "maximum"):
              pc["value"] = list(reversed(cv["values"]))
            else:
              pc["value"] = cv["values"]
            break
    values = pc["value"] + ["N/A"]
    values.reverse() # ordinal values asc order (smallest to largest)
    enc = OrdinalEncoder(categories=[values])     
    enc.fit([[v] for v in values])
    pc["encoder"] = enc
  
  # build mtx
  import pandas as pd
  df = pd.DataFrame([], columns=cnames)
  for m in method_chunks:
    obj = {}
    for cid,pc in projectCharacteristics.items():
      if(cid in m["characteristics"]):
        if(pc["ref"] == m["characteristics"][cid]["ref"]):
          obj[cid] = m["characteristics"][cid]["value"]
    df = df.append(pd.Series(obj, index=df.columns, name=m["id"]))
  df.fillna("N/A",inplace=True)
  print(df)
  separator()
  
  # apply encoding
  encoded = df.copy()
  for key, value in encoded.items(): 
    values = [v if v in projectCharacteristics[key]["value"] else "N/A" for v in value]
    encoded.loc[:,key] = projectCharacteristics[key]["encoder"].transform([[v] for v in values])
  encoded = encoded.loc[:, (encoded != 0).any(axis=0)]
  # print(encoded)
  # separator()

  # construct
  from skcriteria import Data, MAX
  from skcriteria.madm import simple, closeness
  optimal_senses = []
  weights = []
  for cid,pc in encoded.items():
    optimal_senses.append(MAX)
    weights.append(projectCharacteristics[cid].get("weight",1))

  data = Data(encoded.values, optimal_senses, 
    weights=weights,
    anames=encoded.index,
    cnames=encoded.columns)
  #print(data)
  #separator()

  # WeightedSum
  model = simple.WeightedSum(mnorm="vector",wnorm="sum")
  de = model.decide(data)
  print(de)
  separator()

  print(de.e_)
  print("Points:", de.e_.points)

  # TOPSIS
  model2 = closeness.TOPSIS(mnorm="vector",wnorm="sum")
  de2 = model2.decide(data)
  print(de2)
  separator()

  print(de2.e_)
  print("Ideal:", de2.e_.ideal)
  print("Anti-Ideal:", de2.e_.anti_ideal)
  print("Closeness:", de2.e_.closeness)

  # build response
  res = {}
  for cid,pc in projectCharacteristics.items():
    pc.pop("_id",None)
    pc["encoder"] = pc["encoder"].categories[0]
  res["projectCharacteristics"] = [pc for cid,pc in projectCharacteristics.items()]

  z = [{"id":de._data._anames[i], "score":de.e_.points[i],"rank":int(de._rank[i])} for i in range(0,len(de.mtx))]
  z2 = [{"id":de2._data._anames[i], "score":de2.e_.closeness[i],"rank":int(de2._rank[i])} for i in range(0,len(de2.mtx))]

  res["results"] = [
    {
      "model": "WeightedSum",
      "methodChunks": sorted(z, key = lambda x: x["rank"])
    },
    {
      "model": "TOPSIS",
      "methodChunks": sorted(z2, key = lambda x: x["rank"])
    }
  ]

  # print(res)
  # tes = {}
  # tes["project"] = projectCharacteristics
  # tes["method_chunks"] = method_chunks
  # tes["characteristics"] = characteristics

  default = lambda o: f"<<non-serializable: {type(o).__qualname__}>>"
  result = json.loads(json_util.dumps(res, default=default))
  return result

@app.route('/projects')
def projects():
  cursor = mongo.db.projects.find({})
  projects = []
  for document in cursor:
    projects.append(document)
  result = json.loads(json_util.dumps(projects))
  return result
  
@app.route('/method-chunks')
def method_chunks():
  cursor = mongo.db.methodchunks.find({})
  method_chunks = []
  for document in cursor:
    method_chunks.append(document)
  result = json.loads(json_util.dumps(method_chunks))
  return result

@app.route('/characteristics')
def characteristics():
  cursor = mongo.db.characteristics.find({})
  characteristics = []
  for document in cursor:
    characteristics.append(document)
  result = json.loads(json_util.dumps(characteristics))
  return result