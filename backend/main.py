from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_ollama import ChatOllama
import subprocess
import uvicorn

app = FastAPI(title="K8sAI Agent - Cluster Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatOllama(model="llama3.2", temperature=0.3)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        msg = request.message.lower()
        
        if "cluster" in msg or "all" in msg or "everything" in msg:
            result = subprocess.run("kubectl get all --all-namespaces", shell=True, capture_output=True, text=True, timeout=15)
            return {"reply": f"**Full Cluster Resources:**\n\n{result.stdout or result.stderr}"}
        
        elif "pod" in msg or "get pods" in msg:
            result = subprocess.run("kubectl get pods --all-namespaces", shell=True, capture_output=True, text=True, timeout=10)
            return {"reply": f"**Pods:**\n\n{result.stdout or result.stderr}"}
        
        elif "namespace" in msg:
            result = subprocess.run("kubectl get namespaces", shell=True, capture_output=True, text=True, timeout=10)
            return {"reply": f"**Namespaces:**\n\n{result.stdout or result.stderr}"}
        
        elif "top" in msg or "cpu" in msg or "memory" in msg:
            result = subprocess.run("kubectl top pods --all-namespaces", shell=True, capture_output=True, text=True, timeout=10)
            return {"reply": f"**Resource Usage:**\n\n{result.stdout or result.stderr}"}
        
        elif "event" in msg:
            result = subprocess.run("kubectl get events --all-namespaces", shell=True, capture_output=True, text=True, timeout=10)
            return {"reply": f"**Recent Events:**\n\n{result.stdout or result.stderr}"}
        
        elif "node" in msg:
            result = subprocess.run("kubectl get nodes", shell=True, capture_output=True, text=True, timeout=10)
            return {"reply": f"**Nodes:**\n\n{result.stdout or result.stderr}"}
        
        else:
            response = llm.invoke(f"You are K8sAI, expert Platform Engineer. Answer practically:\n\n{request.message}")
            return {"reply": response.content}
    except Exception as e:
        return {"reply": f"Error: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)