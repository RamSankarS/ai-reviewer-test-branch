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
* **State & Sync:** React Hooks with live WebSocket 

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


## Expose Backend to GitHub Using ngrok

GitHub webhooks cannot reach your local machine directly.
Use ngrok to create a temporary public URL that tunnels requests to your local FastAPI server.

### Start ngrok

Open a **new terminal** and run:

```bash
ngrok http 8000
```

You will see output similar to:

```bash
Forwarding  https://abc123.ngrok-free.app -> http://localhost:8000
```

Copy the generated HTTPS URL:

```bash
https://abc123.ngrok-free.app
```

This URL will be used inside your GitHub repository webhook settings.

> ⚠️ Every time ngrok restarts, the generated URL changes unless you use a reserved domain.

---

## Connect GitHub Webhook

Go to your target repository on [GitHub](https://github.com/?utm_source=chatgpt.com) and open:

```text
Settings → Webhooks → Add webhook
```

Fill the webhook form like this:

### Payload URL

Append your backend webhook route to the ngrok URL:

```bash
https://abc123.ngrok-free.app/github-webhook
```

### Content Type

```text
application/json
```

### Events

Select:

```text
Let me select individual events
```

Then enable:

```text
Pull requests
```

### Active

Make sure the webhook is marked as:

```text
Active ✅
```

Finally, click:

```text
Add webhook
```

Once added successfully, GitHub will begin sending PR events directly to your local FastAPI backend through ngrok.



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

## 📸 See it in Action

### 1. Secure Workspace Connection
Users connect their workspace securely using a GitHub Personal Access Token (PAT), requiring zero complex backend authentication setups.
> <img width="1919" height="958" alt="image" src="https://github.com/user-attachments/assets/3d27f0ab-f7a2-41c6-9d25-28d6fb248f06" />


### 2. Real-Time Webhook Interception
The moment a PR is opened, Alaris PR Lens intercepts the payload and begins its analysis.
> <img width="1919" height="956" alt="image" src="https://github.com/user-attachments/assets/c73a8509-655e-4cef-b7f9-e649668fad9f" />


### 3. Catching Critical Vulnerabilities
The AI successfully identifies hardcoded secrets, SQL injection attempts, and deprecated algorithms, mapping them directly to the exact file and line number.
> <img width="1919" height="951" alt="image" src="https://github.com/user-attachments/assets/8469203d-1cd6-4fe6-9132-53b1a81243d8" />


### 4. Code Remediation & Health Restoration
Once the developer pushes a fix, Alaris PR Lens re-scans the diff and updates the repository health score in real-time.
> <img width="1919" height="943" alt="image" src="https://github.com/user-attachments/assets/f6d5c6d7-0858-428d-9e39-5b7899f800ed" />


### 5. Seamless GitHub Integration
Everything is triggered natively via GitHub Webhooks, requiring no change to the developer's standard git workflow.
> <img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/256f105d-93e3-4072-b251-40e6b583f66f" />


---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
