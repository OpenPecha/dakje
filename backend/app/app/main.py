from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import sentence, text_complexity, tokens

app = FastAPI(
    title=settings.PROJECT_NAME,
    docs_url=f"{settings.API_STR}/docs",
    openapi_url=f"{settings.API_STR}/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(tokens.router, prefix=settings.API_STR)
app.include_router(sentence.router, prefix=settings.API_STR)
app.include_router(text_complexity.router, prefix=settings.API_STR)
