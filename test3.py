import sqlite3
import hashlib
import os
from flask import Flask, request

app = Flask(__name__)

# 1. CRITICAL: Hardcoded API Keys and Secrets
SUPER_SECRET_GITHUB_TOKEN = "ghp_98765thisisafakegithubtoken12345"
AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # 2. CRITICAL: Broken Cryptography (MD5 has been obsolete for years)
    hashed_password = hashlib.md5(password.encode()).hexdigest()

    # 3. CRITICAL: SQL Injection vulnerability (String formatting in SQL)
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{hashed_password}'"
    
    try:
        cursor.execute(query)
        user = cursor.fetchone()
        if user:
            return "Login successful!"
        return "Login failed!"
    except Exception as e:
        # 4. WARNING: Blanket exception catching (swallowing errors silently)
        pass 
    finally:
        conn.close()

@app.route('/ping', methods=['GET'])
def ping_server():
    target = request.args.get('ip')
    # 5. CRITICAL: Command Injection (Passing user input directly to the shell)
    os.system(f"ping -c 1 {target}")
    return "Ping executed!"

if __name__ == '__main__':
    # 6. WARNING: Running in debug mode on a public interface
    app.run(host='0.0.0.0', port=5000, debug=True)
