import requests
import json
from flask import Flask, jsonify, request, render_template
import json
app = Flask(__name__)


# This is the url to which the query is made
@app.route('/')
def webhook():
	url1 = "https://auth.cuttingly99.hasura-app.io/v1/signup"
	url2="https://hooks.zapier.com/hooks/catch/2928610/z4cvk2/"
	url3 = "https://data.cuttingly99.hasura-app.io/v1/query"
	# This is the json payload for the query
	requestPayload = {
	    "provider": "username",
	    "data": {
	        "username": "johnsmith47",
	        "password": "js@hasura1"
	    }
	}

	# Setting headers
	headers = {
	    "Content-Type": "application/json"
	}

	

	# Make the query and store response in resp
	
	dbPayload={
    "type" : "create_insert_permission",
    "args" : {
        "table" : "article",
        "role" : "user",
        "permission": {
          "check" : {
              "author_id" : "REQ_USER_ID"
          }
        }
    }
}
	resp = requests.request("POST", url3, data=json.dumps(dbPayload), headers=headers)
	resp = requests.request("POST", url1, data=json.dumps(requestPayload), headers=headers)
	print(json.loads(resp.text)["hasura_id"])
	dbPayload={
    "type":"insert",
    "args":{
        "table":"Users",
        "objects":[
            {"Name":"John smith","Username":"kebab4","Password":"12345678","Age":19,"Email":"123@123","Phone":12343567,"id":json.loads(resp.text)["hasura_id"]}
        ],
        "returning":["id"]
        }
        }
	resp = requests.request("POST", url3, data=json.dumps(dbPayload), headers=headers)

	# resp.content contains the json response.
	pay=dict()
	
	pay=dbPayload["args"]["objects"][0]
	
	print(resp.content)
	resp = requests.request("POST", url2, data=json.dumps(pay), headers=headers)
	#print(resp["hasura_id"])
	
	return "Hello world"
if __name__ == '__main__':
    app.run(debug=True)