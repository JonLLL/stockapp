import sqlite3, models, services, schema
from db import config
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from database import sessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# for react server
origins = [
    'http://localhost:3000'
]

app.add_middleware(CORSMiddleware, allow_origins = origins)

db_dependency = Annotated[Session,Depends(services.get_db)]

# models.Base.metadata.create_all(bind = engine)

# get all stocks in database
@app.get("/stocks", response_model=List[schema.assetModel])
async def get_assets(db : db_dependency, skip: int = 0, limit: int = 100):
    assets = db.query(models.Asset).offset(skip).limit(limit).all()
    return assets

# to run uvicorn main:app --reload