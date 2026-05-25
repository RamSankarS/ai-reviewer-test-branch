import json
from dotenv import load_dotenv
import os
from huggingface_hub import InferenceClient

# HF_TOKEN = os.getenv("HF_TOKEN")
HF_TOKEN =""   
load_dotenv()

MODEL_NAME = "deepseek-ai/DeepSeek-V3-0324:novita"
client = InferenceClient(
    api_key=HF_TOKEN
)

def ai_review(pr_diff:str):
    try:

        if not pr_diff:
            return {
                "healthScore": 0,
                "summary": {
                    "status": "blocked",
                    "message": "No code changes detected"
                }
            }

        with open("/home/doffy18/projects/hackathon/ai-reviewer-test-branch/backend/prompts/review_prompt.txt","r") as f:
            chat_prompt = f.read()
        formatted_diff = ""

        for file in pr_diff:
            formatted_diff += f"File: {file['filename']}\n"
            formatted_diff += file['patch']+ "\n"
        prompt = chat_prompt.replace("{{CODE_DIFF}}", formatted_diff)

        response = client.chat.completions.create(model=MODEL_NAME,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.2,
            max_tokens=1000
        )
        ai_text = response.choices[0].message.content

        start = ai_text.find("{")
        end = ai_text.rfind("}") + 1

        clean_json = ai_text[start:end]

        parsed_json = json.loads(clean_json)

        return parsed_json


    except Exception as a:
        print("Error: ", a)
        return {
            "healthScore": 0,
            "summary": {
                "status": "blocked",
                "message": "AI analysis failed"
            }
        }

