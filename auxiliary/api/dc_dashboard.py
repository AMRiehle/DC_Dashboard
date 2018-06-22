from flask import Flask, render_template, jsonify, redirect, send_file
from flask_pymongo import PyMongo


dc_dashboard = Flask(__name__)
mongo = PyMongo(dc_dashboard)

@dc_dashboard.route('/')
def index():

    return render_template("index.html")


@dc_dashboard.route("/sports")
def sports():
    from functions import getCapsNatsData

    capsdata = mongo.db.capitals.find()
    natsdata = mongo.db.nationals.find()
    
    all_data = getCapsNatsData(capsdata, natsdata)

    return jsonify(all_data)

#function to render sports graph in the index.html
@dc_dashboard.route('/templates/sports.html')
def show_sports():

    return send_file('templates/sports.html')

#function to render dc_maps in the index.html
@dc_dashboard.route('/templates/dc_map.html')
def show_map():

    return send_file('templates/dc_map.html')

if __name__ == "__main__":
    dc_dashboard.run(debug=True)