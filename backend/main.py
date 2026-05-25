from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.review import router as reviewRouter

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    
)
app.include_router(reviewRouter)
