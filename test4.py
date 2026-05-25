import pickle
import base64
import os
import random

# 1. CRITICAL: Hardcoded Cloud Credentials
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
STRIPE_API_KEY = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

def get_user_profile(payload):
    # 2. CRITICAL: Insecure Deserialization (CWE-502)
    # Using pickle on untrusted data allows arbitrary Remote Code Execution (RCE).
    try:
        decoded_payload = base64.b64decode(payload)
        user_data = pickle.loads(decoded_payload)
        return user_data
    except:
        # 3. WARNING: Blanket exception catching (swallowing all errors)
        return None

def read_config_file(filename):
    # 4. CRITICAL: Path Traversal / Directory Traversal (CWE-22)
    # An attacker can pass "../../etc/passwd" as the filename and steal server files.
    filepath = os.path.join("/var/www/configs", filename)
    with open(filepath, 'r') as file:
        return file.read()

def generate_session_token():
    # 5. WARNING: Weak Randomness for Security Functions (CWE-338)
    # The 'random' module is mathematically predictable. Attackers can guess session tokens.
    # Should be using the 'secrets' module instead.
    token = random.randint(100000, 999999)
    return f"session_{token}"

def run_app():
    # Example usage that does nothing but execute the bad functions
    dummy_input = "gASVKQAAAAAAAAB9lCiMBG5hbWWUjBB0cmFzaF9weXRob25fYXBwlIwHdmVyc2lvbpRLAXUu"
    print(get_user_profile(dummy_input))
    print(generate_session_token())
    
    # 6. WARNING: Hardcoding temporary paths that might not exist on all OS
    read_config_file("C:/temp/config.json") 

if __name__ == "__main__":
    run_app()
