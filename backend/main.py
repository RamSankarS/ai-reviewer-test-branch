from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from routes.review import router as reviewRouter
from routes.webhook import router as webhookRouter
from routes.token import router as save_token

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    
)
# app.include_router(reviewRouter)
app.include_router(webhookRouter)
app.include_router(save_token)
