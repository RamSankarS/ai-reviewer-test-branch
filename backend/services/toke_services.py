import json
import os
from config import TOKEN_FILE

def get_token(username: str):

    if not os.path.exists(TOKEN_FILE):
        return None

    with open(TOKEN_FILE, "r") as f:
        tokens = json.load(f)

    return tokens.get(username)