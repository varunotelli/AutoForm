import requests
import json
from flask import Flask, jsonify, request, render_template
import json
app = Flask(__name__)


# This is the url to which the query is made
@app.route('/',methods=['GET', 'POST'])
def webhook():
	stuff=dict()
	if request.method=='POST':
		if request.is_json:
			stuff=request.get_json(force=True)




				
		url1 = "https://auth.cuttingly99.hasura-app.io/v1/signup"
		url2="https://hooks.zapier.com/hooks/catch/2928610/z4cvk2/"
		url3 = "https://data.cuttingly99.hasura-app.io/v1/query"
		# This is the json payload for the query
		requestPayload = {
		    "provider": "username",
		    "data": {
		        "username": stuff['uname'],
		        "password": stuff['password']
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
		#print(json.loads(resp.text)["hasura_id"])
		dbPayload={
	    "type":"insert",
	    "args":{
	        "table":"Users",
	        "objects":[
	            {"Name":stuff['name'],
	            "Username":stuff['uname'],
	            "Password":stuff['password'],
	            "Age":int(stuff['age']),
	            "Email":stuff['email'],
	            "Phone":int(stuff['phone']),
	            "id":json.loads(resp.text)["hasura_id"]}
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
		return jsonify(link='https://drive.google.com/open?id=1S6iUcWVCCuxaA9kSVt7UI150n4vGQsihlcIhuIBcC_U')
	#print(resp["hasura_id"])
	
	return "Hello world"

@app.route('/check',methods=['GET', 'POST'])
def check():
	url3 = "https://data.cuttingly99.hasura-app.io/v1/query"
	headers = {
		    "Content-Type": "application/json"
		}
	stuff=dict()
	if request.method=='POST':
		if request.is_json:
			stuff=request.get_json(force=True)
			dbPayload={
			"type": "count",
			"args": {
			"table": "Users",
			"where": {
			"Username": {
			"$like": stuff["uname"]+"%"
			}
			},
			"distinct": [
			"Username"
			]
			}
			}
			x=False
			resp = requests.request("POST", url3, data=json.dumps(dbPayload), headers=headers)
			ct=json.loads(resp.text)["count"]
			if ct>0 :
				x=True
			return jsonify(username=x)
				

	return "Hi"




if __name__ == '__main__':
    app.run(debug=True)