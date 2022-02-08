from flask import Flask, jsonify, render_template, redirect, request
from contextlib import closing
from datetime import datetime
import sqlite3

app = Flask(__name__)
db_name = 'tracks.db'

# ensure table
with closing(sqlite3.connect("tracks.db")) as connection:
    connection.execute("CREATE TABLE IF NOT EXISTS tracks (id INTEGER PRIMARY KEY, gpx TEXT, place TEXT, type TEXT, distance INTEGER)")

def select(id):
    with closing(sqlite3.connect("tracks.db")) as connection:
        if id == None:
            connection.row_factory = sqlite3.Row
            rows = connection.execute("SELECT id, place, type, distance FROM tracks").fetchall()
            rows = [dict(row) for row in rows]
            
        else:
            rows = connection.execute("SELECT gpx FROM tracks WHERE id = ? LIMIT 1", (id,)).fetchall()
        print(f"SELECT {len(rows)} rows")
        return rows

def insert():
    with closing(sqlite3.connect("tracks.db")) as connection:
        print('INSERT')
        connection.execute("INSERT INTO tracks VALUES (?, '<test>', 'Leiderdorp', 'roundtrip', 34)", (int(round(datetime.now().timestamp())),))
        connection.commit()

    
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api/list")
def list():
    return jsonify(select(None))

@app.route("/api/get/<id>")
def get(id):
    return jsonify(select(id)[0])

@app.route("/api/create", methods = ['POST'])
def create():
    insert()
    return render_template('index.html')
