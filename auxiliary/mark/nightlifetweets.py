
# coding: utf-8
import pymongo
#from flask import Flask, render_template, jsonify, redirect
import tweepy
import pandas as pd

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.dc_dashboard
collection=db.nightlife

# In[10]:


def getTweets():
    
    
    consumerkey='SVmAx1PMTyT9zhydHDRzzZx5E'
    consumersecret='4t1In2jr90E0NYjUKq5O1pfxdb9pmZkZxdtnn0W469bI2Xzhgd'
    accesstoken='979124724012855296-bFuii1batR00bMkarTcWUDzHg89P5hg'
    accesssecret='Pozvx42D2KZZM0dxsY8oT1rhtI2IY34yo2SDXjAreB8Vy'

    auth = tweepy.OAuthHandler(consumerkey, consumersecret)
    auth.set_access_token(accesstoken, accesssecret)
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())

    target_terms = ["Adams Morgan", "Clarendon", "Columbia Heights",
                   "Dupont Circle", "Georgetown","H St.", "H Street",
                   "Logan Circle", "U Street", "U St."]

    min_tweets = 5
    max_tweets = 10000
    max_followers = 2500
    max_following = 2500
    lang = "en"


    neighborhood=[]
    tweet_text=[]
    date=[]



    for target in target_terms:

        oldest_tweet = None


        for x in range(3):

            public_tweets = api.search(
                target, count=10, result_type="recent", max_id=oldest_tweet)

            for tweet in public_tweets["statuses"]:
                neighborhood.append(target)
                tweet_text.append(tweet['text'])
                date.append(tweet['created_at'])


    nightlife_df=pd.DataFrame({"Neighborhood": neighborhood,
                              "Tweet": tweet_text,
                              "Date": date})

    nightlifetweets=nightlife_df.to_dict('records')
    
    print(nightlifetweets)
    
    return nightlifetweets

    for x in nightlifetweets:
        collection.insert_one(x)

nighttweets = getTweets()

for x in nighttweets:
    collection.insert_one(x)
