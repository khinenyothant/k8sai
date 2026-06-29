# K8sAI Agent - AI Cluster Analyzer

**AI-powered assistant that analyzes your Minikube Kubernetes cluster.**

## Features
- Real-time cluster information using natural language
- Shows pods, namespaces, nodes, events, resource usage
- General Kubernetes explanations
- Fully local (Ollama + Minikube)

## Quick Start

### Backend
```bash
cd backend
source venv/bin/activate
python main.py


### Frontend
```bash
cd frontend
npm run dev

Open: http://localhost:5173

🧪 Example Questions

get pods
get namespace
top pods
analyse cluster
show events
what is kubernetes
show nodes

📁 Project Structure
textk8sai/
├── backend/          # FastAPI + AI logic
├── frontend/         # React Chat UI
├── docs/             # Knowledge base
└── README.md

🛠 Tech Stack

LLM: Ollama (llama3.2)
Backend: FastAPI + LangChain
Frontend: React + Tailwind CSS
Kubernetes: Minikube


### Test with API
Swagger UI: http://localhost:8000/docs
Test the /chat endpoint directly