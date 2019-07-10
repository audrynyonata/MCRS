from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import json_util, ObjectId
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
  return jsonify(result)

def getOrdinal(x):
  if x["type"] == "ordinal" :
    return True
  else:
    return False

@app.route('/find', methods=['POST'])
def find():
  project = request.get_json()
  
  cursor = mongo.db.methodchunks.find({})
  
  method_chunks = []
  for document in cursor:
    method_chunks.append(document)
  
  tes = {}
  tes["project"] = project
  tes["method_chunks"] = method_chunks
  
  result = json.loads(json_util.dumps(tes))
  return jsonify(result)
