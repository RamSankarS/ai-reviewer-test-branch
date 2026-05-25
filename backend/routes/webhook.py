from fastapi import APIRouter, Request
from pydantic import BaseModel
from backend.services.toke_services import get_token
from services.github_services import fetch_pr_files
from services.ai_services import ai_review


router = APIRouter()

class RepoLink(BaseModel):
    pr_url: str

@router.post("/github-webhook")
async def github_webhook(request: Request):

    payload = await request.json()

    action = payload.get("action")
    if action not in ["opened", "synchronize"]:

        return {
            "message": "Ignored event"
        }
    
    pull_request = payload.get("pull_request")
    if not pull_request:

        return {
            "message": "No PR found"
        }
    pr_url = pull_request.get("html_url")

    print("PR URL:", pr_url)

    repository = payload.get("repository", {})
    owner_info = repository.get("owner", {})
    owner_name = owner_info.get("login")
    print("Repository:", owner_name)

    github_token = get_token(owner_name)
    if not github_token:
        return {
            "status":"error",
            "message": f"No GitHub token found for user {owner_name}"
        }


    pr_diff = fetch_pr_files(pr_url, github_token)
    review_result = ai_review(pr_diff)

    print(review_result)

    return {
        "status": "success",
        "review": review_result
    }