import os
import sqlite3
import secrets
import logging
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

# 1. GOOD: Strict setup and logging configuration
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# 2. GOOD: Secrets are never hardcoded. 
# They are fetched securely from environment variables.
STRIPE_API_KEY = os.environ.get("STRIPE_API_KEY")
AWS_SECRET_KEY = os.environ.get("AWS_SECRET_KEY")

@app.route('/login', methods=['POST'])
def login():
    # 3. GOOD: Strict input validation and safe JSON parsing
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Invalid payload"}), 400

    username = data.get('username')
    password = data.get('password')

    try:
        # 4. GOOD: Context managers ensure the DB connection automatically closes
        with sqlite3.connect('users.db') as conn:
            cursor = conn.cursor()
            
            # 5. GOOD: Parameterized Queries prevent SQL Injection
            # Notice the `?` syntax instead of using an f-string
            cursor.execute("SELECT password_hash FROM users WHERE username = ?", (username,))
            user_record = cursor.fetchone()

            # 6. GOOD: Cryptographically secure password verification 
            # (Replaces the obsolete and vulnerable MD5 hash)
            if user_record and check_password_hash(user_record[0], password):
                
                # 7. GOOD: Using the `secrets` module for cryptographically secure random tokens
                # (Replaces the mathematically predictable `random` module)
                session_token = secrets.token_urlsafe(32)
                return jsonify({"message": "Success", "token": session_token}), 200
            
            # 8. GOOD: Generic error messages prevent username enumeration
            return jsonify({"error": "Invalid credentials"}), 401

    except sqlite3.Error as e:
        # 9. GOOD: Errors are logged internally, not exposed to the user
        app.logger.error(f"Database error occurred: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/ping', methods=['POST'])
def ping_server():
    # 10. GOOD: Command injection is prevented by completely avoiding os.system()
    # If network checks are needed, use a dedicated library like `requests` or `socket`
    data = request.get_json()
    target_ip = data.get('ip')
    
    # Example of strict allow-listing for IP inputs
    if target_ip not in ["127.0.0.1", "192.168.1.1"]:
        return jsonify({"error": "Unauthorized target"}), 403
        
    return jsonify({"message": f"Ping mocked securely for {target_ip}"}), 200

if __name__ == '__main__':
    # 11. GOOD: Debug mode is explicitly disabled for production safety
    app.run(host='127.0.0.1', port=5000, debug=False)
