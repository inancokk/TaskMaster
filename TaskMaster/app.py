from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['taskmaster']
tasks_collection = db['tasks']

@app.route('/tasks', methods=['POST'])
def add_task():
    task = request.json
    if not task or not 'title' in task:
        return jsonify({'error': 'Task is required'}), 400

    result = tasks_collection.insert_one(task)
    task['_id'] = str(result.inserted_id)
    return jsonify(task), 201

if __name__ == '__main__':
    app.run(debug=True)
