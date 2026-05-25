import os
import sqlite3
import pickle
import base64

# ❌ VULNERABILITY: Hardcoded sensitive credentials
AWS_ACCESS_KEY = "AKIAEXAMPLE123456789"
DB_PASSWORD = "password123!"

def process_user_data(user_input, payload):
    # ❌ VULNERABILITY: SQL Injection (CWE-89)
    # Using f-strings to build queries allows attackers to bypass authentication.
    db = sqlite3.connect("users.db")
    cursor = db.cursor()
    query = f"SELECT * FROM users WHERE username = '{user_input}'"
    cursor.execute(query)

    # ❌ VULNERABILITY: Insecure Deserialization (CWE-502)
    # Using pickle on untrusted base64 data allows Remote Code Execution (RCE).
    data = pickle.loads(base64.b64decode(payload))
    
    # ❌ VULNERABILITY: Command Injection (CWE-78)
    # Passing unsanitized input directly to a system shell.
    os.system(f"ping -c 1 {user_input}")
    
    return data
