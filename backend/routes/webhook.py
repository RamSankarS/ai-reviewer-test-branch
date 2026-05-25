from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.toke_services import get_token
from services.github_services import fetch_pr_files
from services.ai_services import ai_review


router = APIRouter()

class RepoLink(BaseModel):
    pr_url: str

@router.post("/github-webhook")
async def github_webhook(request: Request):
    try:
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
        print(github_token)

        if not github_token:
            return {
                "status":"error",
                "message": f"No GitHub token found for user {owner_name}"
            }
        print(github_token)


        pr_diff = fetch_pr_files(pr_url, github_token)
        print(pr_diff)
        review_result = ai_review(pr_diff)

        print(review_result)

        return {
            "status": "success",
            "review": review_result
        }
    except Exception as e:
        print("Error processing webhook:", e)
        return {
            "status": "error",
            "message": str(e)
        }