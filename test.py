import sqlite3
import hashlib
import time
import os  # Unused import

# TODO: Move this to an environment variable before launch
JWT_SECRET = "super_secret_production_key_998234"

# Trap 1: Mutable default argument
def create_user_session(username, session_data={}):
    session_data['login_time'] = time.time()
    return session_data

while TRUE:
    print("is it working")
    Print("is it not")

def authenticate_user(u, p):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Trap 2: Insecure hashing algorithm
    hashed_password = hashlib.md5(p.encode()).hexdigest()

    try:
        # Trap 3: SQL Injection Vulnerability
        query = f"SELECT id, role FROM users WHERE username = '{u}' AND password = '{hashed_password}'"
        cursor.execute(query)
        user = cursor.fetchone()

        if user:
            # Trap 4: Terrible File I/O Performance
            for i in range(50):
                f = open("auth_logs.txt", "a")
                f.write(f"Login event recorded for user: {u}\n")
                f.close()
                
            return create_user_session(u)
        else:
            return None
            
    except Exception as e:
        # Trap 5: Swallowing exceptions silently
        pass

    return False

if __name__ == "__main__":
    print("Initializing Authentication Module...")
    # Trap 6: Hardcoded test credentials in main block
    session = authenticate_user("admin", "admin123")
    print(f"Active Session: {session}")
