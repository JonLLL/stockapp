import sqlite3, models, services, schema
from db import config
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
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
@app.get("/stocks", response_model=schema.assetModel)
async def get_stocks():
    connection = sqlite3.connect(config.DB_FILE)
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    cursor.execute("""
        SELECT id, symbol, type FROM asset WHERE type LIKE 'STOCK'
    """)

    rows = cursor.fetchall()

    return{"title":"dashboard", "stocks" : rows}

# to run uvicorn main:app --reload