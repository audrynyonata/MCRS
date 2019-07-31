from flask import Flask, request
from flask_pymongo import PyMongo
from bson import json_util, ObjectId
from skcriteria import Data, MIN, MAX
import json
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/mcrs"
mongo = PyMongo(app)

@app.route('/')
def index():
  return 'Welcome to MCDM!'
  
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

def getOrdinal(x):
  if x["type"] == "ordinal" :
    return True
  else:
    return False

@app.route('/find', methods=['POST'])
def find():
  project = request.get_json()["project"]
  #  ordinals = filter(getOrdinal,project.get("characteristics",None))
  #  return jsonify(project["characteristics"])

  cursor = mongo.db.methodchunks.find({})
  method_chunks = []
  for document in cursor:
    for characteristic in document.characteristics:
      if (characteristic["name"]) in project["characteristics"]:
        method_chunks.append(document)

  cursor = mongo.db.characteristics.find({})
  characteristics = []
  for document in cursor:
    if (document["name"]) in project["characteristics"]:
      characteristics.append(document)

  #  criteria = []

  tes = {}
  tes["project"] = project
  tes["method_chunks"] = method_chunks
  tes["characteristics"] = characteristics
  
  result = json.loads(json_util.dumps(tes))
  return result
