from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo


dc_dashboard = Flask(__name__)
mongo = PyMongo(dc_dashboard)


@dc_dashboard.route("/sports")
def sports():
    from functions import getCapsNatsData

    capsdata = mongo.db.capitals.find()
    natsdata = mongo.db.nationals.find()
    
    all_data = getCapsNatsData(capsdata, natsdata)

    return jsonify(all_data)


if __name__ == "__main__":
    dc_dashboard.run(debug=True)