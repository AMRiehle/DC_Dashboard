from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo


dc_dashboard = Flask(__name__)
mongo = PyMongo(dc_dashboard)


@dc_dashboard.route("/")
def index():

    caps = []
    for line in mongo.db.capitals.find():
        line.pop('_id') #id is not a string and can't be jsonified
        caps.append(line)
    
    # caps = [(line.pop('_id'))for line in mongo.db.capitals.find()]
    c_years = [line['Season'] for line in caps]
    c_wins = [int(line['W']) for line in caps]
    c_attendance = [int(line['Attendance']) for line in caps]
    c_playoffs = [line['Playoffs'] for line in caps]

    capsdict = {'years': c_years, 'wins': c_wins, 'attendance': c_attendance, 'comments': c_playoffs}


    return jsonify(capsdict)


if __name__ == "__main__":
    dc_dashboard.run(debug=True)