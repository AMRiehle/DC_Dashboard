from flask import Flask, render_template, jsonify, redirect, send_file
from flask_pymongo import PyMongo
from functions import getRidOfId


dc_dashboard = Flask(__name__)
mongo = PyMongo(dc_dashboard)

@dc_dashboard.route('/')
def index():

    return render_template("tweets.html")


@dc_dashboard.route("/tweets")
def sports():

    tweets = getRidOfId(mongo.db.nightlife.find())
    

    return jsonify(tweets)


if __name__ == "__main__":
    dc_dashboard.run(debug=True)