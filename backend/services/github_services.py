
import requests
import os
from urllib.parse import urlparse

# GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
# GITHUB_TOKEN = ""

def fetch_pr_files(pr_url: str, GITHUB_TOKEN: str):

    path_parts = urlparse(pr_url).path.strip("/").split("/")     # extract owner, repo, pr number

    if len(path_parts) < 4:
        raise ValueError("Invalid GitHub PR URL")

    if path_parts[2] != "pull": 
        raise ValueError("Not a pull request URL")

    owner = path_parts[0]
    repo = path_parts[1]
    pr_number = path_parts[3]

    api_url = f"https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}/files" # github api url
    headers = { "Authorization": f"Bearer {GITHUB_TOKEN}" }     

    response = requests.get(api_url, headers=headers, timeout = 10)
    response.raise_for_status()

    files_data = response.json()

    changed_files = []

    for file in files_data:

        changed_files.append({
            "filename": file["filename"],
            "patch": file.get("patch", "")
        })

    return changed_files
