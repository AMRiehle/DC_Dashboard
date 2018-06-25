from flask import Flask, render_template, jsonify, redirect, send_file, request
from flask_pymongo import PyMongo
from functions import getRidOfId


dc_dashboard = Flask(__name__)
mongo = PyMongo(dc_dashboard)

@dc_dashboard.route('/')
def index():

    return render_template("index.html")


@dc_dashboard.route("/sports")
def sports():
    # from functions import getRidOfId

    capsdata = getRidOfId(mongo.db.capitals.find())
    natsdata = getRidOfId(mongo.db.nationals.find())
    
    all_data = [capsdata, natsdata]

    return jsonify(all_data)


#function to render sports graph in the index.html
@dc_dashboard.route('/templates/sports.html')
def show_sports():

    return send_file('templates/sports.html')


#function to render dc_maps in the index.html
@dc_dashboard.route('/templates/dc_map.html')
def show_map():

    return send_file('templates/dc_map.html')


@dc_dashboard.route('/gunshots')
def getShots():

    allshots = getRidOfId(mongo.db.gunshots.find())

    return jsonify(allshots)


@dc_dashboard.route('/singleshots')
def getSingle():

    single = getRidOfId(mongo.db.singlegunshot.find())

    return jsonify(single)


@dc_dashboard.route('/multishots')
def getMulti():

    multi = getRidOfId(mongo.db.multigunshot.find())

    return jsonify(multi)


@dc_dashboard.route('/arenas')
def getArenas():

    arenas = getRidOfId(mongo.db.arenas.find())

    return jsonify(arenas)

@dc_dashboard.route('/form', methods=["GET", "POST"])
def form():
    if request.method == "POST":
        name = request.form["name"]
        rating = request.form["rating"]
        comment = request.form["comment"]
        print(name)
        print(rating)
        print(comment)
        return redirect("/", code=302)

    return render_template('index.html')



if __name__ == "__main__":
    dc_dashboard.run(debug=True)