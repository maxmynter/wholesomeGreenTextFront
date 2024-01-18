from flask import Flask, request, jsonify, send_from_directory
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


DB = "db.json"

IMAGE_DIR = '/Users/maxmynter/Desktop/projects/wholesomegreentextLLM/data/images'


def load_json(filename):
    try:
        with open(filename, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}  # Return an empty dictionary if file doesn't exist


def save_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)


@app.route("/", methods=['GET', 'POST'])
def helloWorld():
    return "Hello, world!"


@app.route('/api/images/<path:filename>')
def serve_image(filename):
    print("Filename", filename)
    return send_from_directory(IMAGE_DIR, filename)


@app.route('/api/get-data', methods=['GET'])
def get_data():
    data_dict = load_json(DB)
    return jsonify(data_dict)


@app.route('/api/update-data', methods=['POST'])
def update_data():
    data = request.json
    data_dict = load_json(DB)
    key = data['filename']

    # Update existing entry or create new if key doesn't exist
    if key in data_dict:
        data_dict[key]['verified'] = data['verified']
    else:
        data_dict[key] = {
            "unprocessed": data['unprocessed'],
            "truncated": data['truncated'],
            "verified": data['verified']
        }

    save_json(data_dict, DB)
    return jsonify({"status": "success"})


if __name__ == '__main__':

    app.run(port=5002, debug=True)
