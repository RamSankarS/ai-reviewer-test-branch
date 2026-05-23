import requests
from urllib.parse import urlparse


def fetch_pr_files(pr_url: str):

    # extract owner, repo, pr number
    path_parts = urlparse(pr_url).path.strip("/").split("/")

    owner = path_parts[0]
    repo = path_parts[1]
    pr_number = path_parts[3]

    # github api url
    api_url = f"https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}/files"

    response = requests.get(api_url)

    files_data = response.json()

    changed_files = []

    for file in files_data:

        changed_files.append({
            "filename": file["filename"],
            "patch": file.get("patch", "")
        })

    return changed_files