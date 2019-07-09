from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
  return 'Welcome to MCDM!'
  
@app.route('/greet')
def say_hello():
  return 'Hello from Server'