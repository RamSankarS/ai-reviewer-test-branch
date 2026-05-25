# from fastapi import APIRouter
# from pydantic import BaseModel
# from services.github_services import fetch_pr_files
# from services.ai_services import ai_review


# router = APIRouter()

# class RepoLink(BaseModel):
#     pr_url: str

# @router.post('/review')
# def review_pr(data: RepoLink):
#     files = fetch_pr_files(data.pr_url)
#     review = ai_review(str(files))

#     return{
#         "status": "success",
#         "message": f"got the pr_url '{data.pr_url}' successfully",
#         # "files": files,
#         "review": review
#     }





# # @router.get("/")
# # def get_reviews():
# #     return {"message": "All reviews"}