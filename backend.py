from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)

@app.route('/bfhl', methods=['POST', 'GET'])
def bfhl():
    if request.method == 'POST':
        return handle_post_request()
    elif request.method == 'GET':
        return handle_get_request()

def handle_post_request():
    try:
        data = request.json.get('data', [])
        
        if not isinstance(data, list):
            return jsonify({"is_success": False, "error": "Invalid input format"}), 400
        
        numbers = [item for item in data if isinstance(item, str) and item.isdigit()]
        alphabets = [item for item in data if isinstance(item, str) and item.isalpha()]
        highest_lowercase = max((char for char in alphabets if char.islower()), default='')

        response = {
            "is_success": True,
            "user_id": os.environ.get('USER_ID', 'Dhruv_Baheti'),
            "email": os.environ.get('EMAIL', 'dbaheti2003@gmail.com'),
            "roll_number": os.environ.get('ROLL_NUMBER', 'ABCD123'),
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }
        
        logging.info(f"Processed request with {len(data)} items")
        return jsonify(response)
    except Exception as e:
        logging.error(f"Error processing request: {str(e)}")
        return jsonify({"is_success": False, "error": "Internal server error"}), 500

def handle_get_request():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)