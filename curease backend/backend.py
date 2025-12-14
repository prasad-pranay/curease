from flask import Flask, jsonify,request
from byknn import predict_disease_knn
from flask_cors import CORS
from geminibg import getResponse
from foodAnalyze import AnalyzeFood
from os.path import join
from ImageWriter import GenerateWriter

app = Flask(__name__)
CORS(app) 
@app.route("/")
def home():
    return "Hello, Flask is running!"

@app.route("/get-symptoms", methods=["POST"])
def get_data():
    data = request.get_json()
    symptoms = {}
    for i in data['data']:
        symptoms[i] = 1
    predicted = predict_disease_knn(symptoms,data['count'])
    return jsonify({"data": predicted})

@app.route("/get-response", methods=["POST"])
def get_response():
    data = request.get_json()
    print("printing got value here")
    print(data)
    query = data['query']
    history = data['history']
    result = getResponse(query,history)
    return jsonify({"data": result})

@app.route("/food-image", methods=["POST"])
def food_image():
    if "file" not in request.files:
        return jsonify({"error": "No image part"}), 400

    image = request.files["file"]
    save_path = join("foodAnalyze", image.filename)
    image.save(save_path)

    result = AnalyzeFood(save_path)

    return jsonify({"data":result})


@app.route("/get-recipt", methods=["POST"])
def get_recipt():
    data = request.get_json()
    # name,age,gender,id,items,docName,docId
    result = GenerateWriter(data["name"],data["age"],data["gender"],data["id"],data["items"],data["docName"],data["docId"],data['notes'])
    return jsonify({"img": result})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
