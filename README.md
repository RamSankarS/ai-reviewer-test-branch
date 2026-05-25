# 📣 Alaris PR Lens

**AI DevSecOps & Real-Time PR Monitoring**

Alaris PR lens is an automated, AI-powered security gatekeeper for your codebase. By seamlessly integrating with GitHub via webhooks, it intercepts Pull Requests in real-time, conducts deep AI-driven vulnerability analysis, and streams actionable metrics directly to a live developer dashboard. 

Stop hardcoded secrets, SQL injections, and logic bugs *before* they merge.

---

## ✨ Key Features

* **Real-Time PR Interception:** Instantly triggers on `pull_request` open or synchronize events via GitHub Webhooks.
* **Deep AI Security Analysis:** Scans code diffs for critical vulnerabilities, performance bottlenecks, and bad architectural practices using advanced LLM integration.
* **Live Telemetry Dashboard:** A high-fidelity React dashboard that updates hands-free (via WebSockets/Polling) the second an AI review is complete.
* **Granular Health Scoring:** Translates complex code reviews into an actionable Health Score, categorizing issues by Critical Security, Logic Bugs, and Performance.
* **Secure Workspace Connection:** Authenticates developers using scoped GitHub Personal Access Tokens (PAT) for strict repository access control.

---

## 🏗️ Architecture & Tech Stack

### Frontend (Dashboard)
* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State & Sync:** React Hooks with live short-polling / WebSocket fallback

### Backend (AI Engine)
* **Framework:** Python (FastAPI)
* **Tunneling:** ngrok (for local webhook exposition)
* **Intelligence:** LLM Integration (for diff analysis and JSON payload generation)
* **Integration:** GitHub REST API & Webhook Payloads

---

## 🚀 Getting Started

To run Alaris PR Lens locally for development or demonstration purposes, you will need to run both the frontend and backend servers simultaneously.

### Prerequisites
* Node.js (v18+)
* Python (3.10+)
* A GitHub account with a generated Personal Access Token (PAT) containing `repo` and `admin:repo_hook` scopes.
* [ngrok](https://ngrok.com/) installed on the backend machine.

### 1. Backend Setup (AI Engine)
Navigate to the backend directory, install the required Python packages, and start the server.

```bash
cd backend
pip install -r requirements.txt
# Start the FastAPI server (adjust based on your specific entry point)
uvicorn main:app --reload --port 8000
```

### 2. Once Server is running, expose it to internet so github can reach it

```bash 
ngrok http 8000
```

### 3. Navigate to frontend directory, install dependencies and start vite development server

```bash 
cd frontend
npm install
npm run dev
```
## 🎮 How to Use (Demo Flow)

1. **Connect Workspace:** Open the React frontend (`localhost:5173`), enter your GitHub Username, and paste your scoped PAT.
2. **Setup Webhook:** In your target GitHub repository, go to `Settings > Webhooks`, click **Add webhook**, and paste your `ngrok` URL appended with your payload route (e.g., `/webhook`). Set Content type to `application/json` and select **Pull requests**.
3. **Trigger Analysis:** Create a new branch, write some code (or inject a test vulnerability), and open a Pull Request.
4. **Watch it Work:** Alaris will intercept the webhook, analyze the diff, and push the health metrics straight to your live dashboard.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
