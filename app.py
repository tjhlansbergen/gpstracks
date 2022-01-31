from flask import Flask, jsonify, render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api/list")
def list():
    return jsonify("hallo", "daar")
