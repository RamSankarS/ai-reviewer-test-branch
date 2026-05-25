import json

TOKEN_FILE = "tokens.json"

def get_token(username: str):

    with open(TOKEN_FILE, "r") as f:
        tokens = json.load(f)

    return tokens.get(username)