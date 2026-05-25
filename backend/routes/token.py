from fastapi import APIRouter
from pydantic import BaseModel
import json
import os

router = APIRouter()

TOKEN_FILE = "tokens.json"

class TokenData(BaseModel):
    username: str
    github_token: str

@router.post("/save-token")
def save_token(data: TokenData):

    try: 
        tokens = {}

        if os.path.exists(TOKEN_FILE):
            with open(TOKEN_FILE, "r") as f:
                tokens = json.load(f)

        tokens[data.username] = data.github_token

        with open(TOKEN_FILE, "w") as f:
            json.dump(tokens, f)

        return {
            "status": "success",
            "message": "Token saved"
        }
    except Exception as e:
        return {
            "status" : 'error',
            "message": str(e)
        }