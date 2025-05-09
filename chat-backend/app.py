
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from phi.agent import Agent
from phi.model.groq import Groq
from dotenv import load_dotenv
from datetime import datetime 
from pydantic import BaseModel
import os

load_dotenv()

# Get Groq API key
GROQ_API_KEY = os.getenv('GROQ_API_KEY')

# Check if the API key is set
if not GROQ_API_KEY:
    raise ValueError("❌ Error: GROQ_API_KEY is not set. Make sure the .env file is configured correctly.")

# Request models
class ChatMessage(BaseModel):
    message: str

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
# ✅ Financial Planning Agent (Creates Investment & Savings Strategy)
try:
    chat_agent = Agent(
        name="Financial Chat Agent",
        role=f"You are a support chatbot for a marketing website for a fictional software resale startup named SoftSell.",
        model=Groq(id="llama-3.1-8b-instant", api_key=GROQ_API_KEY),
        instructions=[
        "Answer user questions in a clear and beginner-friendly way.",
        "Handle user critisms",
    ],
        show_tools_calls=True,
        markdown=True,
    )

except Exception as e:
    print(f"Error initializing agents: {str(e)}")
    raise

# ✅ Chat endpoint
@app.post("/api/chat")
async def chat(message: ChatMessage):
    try:
        if not message.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # Get response from financial planning agent
        response = await chat_agent.arun(message.message)
        
        # Extract text content from RunResponse
        response_text = response.content if hasattr(response, 'content') else str(response)
        
        return {
            "message": response_text,
            "timestamp": str(datetime.now())
        }
    except Exception as e:
        error_msg = str(e)
        print(f"Error in chat endpoint: {error_msg}")
        if "API key" in error_msg.lower():
            raise HTTPException(status_code=500, detail="API key configuration error")
        elif "rate limit" in error_msg.lower():
            raise HTTPException(status_code=429, detail="Too many requests. Please try again later")
        else:
            raise HTTPException(status_code=500, detail=f"An error occurred: {error_msg}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)