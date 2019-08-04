from flask import Flask, request
from flask_pymongo import PyMongo
from bson import json_util, ObjectId
import json
import pprint

def separator():
  print("------------------------------------------------------------------------------------------------------------------")

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/mcrs"
mongo = PyMongo(app)

@app.route('/')
def index():
  return 'Welcome to MCDM!'

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

@app.route('/find', methods=['POST'])
def find():
  id = request.get_json()["project"]

  # fetch & preprocess
  project = mongo.db.projects.find_one_or_404({"id": id})
  project["characteristics"] = {
    project["characteristics"][i]["characteristic"] : project["characteristics"][i] for i in range(0,len(project["characteristics"]))
  }

  cnames = list(project["characteristics"].keys())

  # fetch & preprocess
  cursor = mongo.db.characteristics.find({"id": {"$in": cnames}})
  characteristics = {}
  for document in cursor: 
    characteristics[document["id"]] = document

  from sklearn.preprocessing import OrdinalEncoder
  import numpy as np
  
  # create encoder
  for cid,pc in project["characteristics"].items():
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
    values = pc["value"] + [""]
    values.reverse() # ordinal values asc order (smallest to largest)
    enc = OrdinalEncoder(categories=[values])     
    enc.fit(np.reshape(values,(-1,1)).tolist())
    pc["encoder"] = enc
  
  pp = pprint.PrettyPrinter(indent=1)
  pp.pprint(project)
  separator()

  # fetch & preprocess
  cursor = mongo.db.methodchunks.find({"characteristics.characteristic": {"$in": cnames}})
  method_chunks = []
  for document in cursor: 
    document["characteristics"] = {
      document["characteristics"][i]["characteristic"] : document["characteristics"][i] for i in range(0,len(document["characteristics"]))
    }
    method_chunks.append(document)

  # build mtx
  import pandas as pd
  df = pd.DataFrame([], columns=cnames)
  for m in method_chunks:
    obj = {}
    for cid,pc in project["characteristics"].items():
      if(cid in m["characteristics"]):
        if(pc["ref"] == m["characteristics"][cid]["ref"]):
          obj[cid] = m["characteristics"][cid]["value"]
    df = df.append(pd.Series(obj, index=df.columns, name=m["id"]))
  df.fillna("",inplace=True)
  print(df)
  separator()
  
  # apply encoding
  encoded = df.copy()
  for key, value in encoded.iteritems(): 
    try:
      encoded.loc[:,key]=project["characteristics"][key]["encoder"].transform(np.array(value).reshape(-1,1))
    except:
      print("Encoding err")
      pass
  print(encoded)
  separator()

  # construct
  from skcriteria import Data, MAX
  optimal_senses = []
  weights = []
  for cid,pc in project["characteristics"].items():
    optimal_senses.append(MAX)
    weights.append(pc.get("weight",1))

  data = Data(encoded.values, optimal_senses, 
    weights=weights,
    anames=encoded.index,
    cnames=encoded.columns)
  #print(data)
  #separator()

  from skcriteria.madm import simple, closeness

  # WeightedSum
  model = simple.WeightedSum(mnorm="vector",wnorm="sum")
  de = model.decide(data)
  print(de)
  separator()

  print(de.e_)
  de.e_.points

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
  tes = {}
  tes["project"] = project
  tes["method_chunks"] = method_chunks
  tes["characteristics"] = characteristics
  
  default = lambda o: f"<<non-serializable: {type(o).__qualname__}>>"
  result = json.loads(json_util.dumps(tes, default=default))
  return result
