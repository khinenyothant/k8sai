# K8sAI Agent - AI Cluster Analyzer

**AI-powered assistant that analyzes your Minikube Kubernetes cluster.**

## Features
- Real-time cluster information using natural language
- Shows pods, namespaces, nodes, events, resource usage
- General Kubernetes explanations
- Fully local (Ollama + Minikube)

## Prerequisites

Before running this project, make sure you have:

- **Ollama** installed and running
  - Download from [ollama.com](https://ollama.com)
  - Run: `ollama pull llama3.2`

- A **local Kubernetes cluster** running (you can use Minikube, kind, or any local cluster)

- Python 3.11+ and Node.js installed

  
## Quick Start

### Backend
```bash
cd backend
source venv/bin/activate
python main.py
```

### Frontend
```bash
cd frontend
npm run dev
```

Open: http://localhost:5173

<img width="1635" height="541" alt="Screenshot 2026-06-29 at 18 26 11" src="https://github.com/user-attachments/assets/123dcd6c-460f-4a76-8f06-d50d516ff122" />


🧪 Example Questions

```bash
get pods
get namespace
top pods
analyse cluster
show events
what is kubernetes
show nodes
```

<img width="1455" height="1004" alt="Screenshot 2026-06-29 at 18 28 06" src="https://github.com/user-attachments/assets/3a757045-b60b-4847-ad52-26fc3d140f66" />




📁 Project Structure

```bash
textk8sai/
├── backend/          # FastAPI + AI logic
├── frontend/         # React Chat UI
├── docs/             # Knowledge base
└── README.md
```

🛠 Tech Stack

```bash
LLM: Ollama (llama3.2)
Backend: FastAPI + LangChain
Frontend: React + Tailwind CSS
Kubernetes: Minikube
```

🔧 Test with API

**Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)

This is an interactive documentation where you can test the `/chat` endpoint directly.
<img width="1520" height="954" alt="Screenshot 2026-06-29 at 18 30 03" src="https://github.com/user-attachments/assets/82418948-9493-46a0-b095-af1430f54141" />


**How to test:**
1. Go to `http://localhost:8000/docs`
2. Find **POST /chat**
3. Click "Try it out"
4. Enter this in the request body:
   ```json
   {
     "message": "get pods"
   }


<img width="1432" height="925" alt="Screenshot 2026-06-29 at 18 30 24" src="https://github.com/user-attachments/assets/812a6785-7333-4a7f-a65e-f830504638ac" />
