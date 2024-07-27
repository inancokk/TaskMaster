from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['taskmaster']
collection = db['tasks']

test_task = {
  "title": "Sample Task",
  "description": "This is a sample task description.",
  "completed": False
}

try:
    result = collection.insert_one(test_task)
    print("Document successfully added:", result.inserted_id)
except Exception as e:
    print("Error occurred:", str(e))
