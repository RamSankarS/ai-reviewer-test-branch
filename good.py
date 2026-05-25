import os
import sqlite3
import json
import subprocess
import logging

# ✅ GOOD: Credentials are pulled from Environment Variables, not hardcoded.
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")

def process_user_data_safely(user_input, json_payload):
    try:
        # ✅ GOOD: Parameterized Queries (Prepared Statements)
        # The '?' placeholder ensures input is treated as data, not executable code.
        with sqlite3.connect("users.db") as db:
            cursor = db.cursor()
            cursor.execute("SELECT * FROM users WHERE username = ?", (user_input,))

        # ✅ GOOD: Safe Data Parsing
        # Using JSON instead of Pickle prevents arbitrary code execution.
        data = json.loads(json_payload)
        
        # ✅ GOOD: Secure Subprocess Management
        # Using a list with subprocess.run prevents shell injection.
        subprocess.run(["ping", "-c", "1", user_input], check=True, capture_output=True)
        
        return data

    except (sqlite3.Error, json.JSONDecodeError, subprocess.CalledProcessError) as e:
        # ✅ GOOD: Internal errors are logged, not leaked to the end user.
        logging.error(f"Processing failed: {e}")
        return None
