import models, services, schema
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
@app.get("/assets/", response_model=List[schema.assetModel])
async def get_assets(db : db_dependency):#, skip: int = 0, limit: int = 100):
    assets = db.query(models.Asset).all()#.offset(skip).limit(limit).all()
    return assets

# get stockprice by id, hourly data
@app.get("/assets/{stock_id}", response_model=List[schema.stockPriceModel])
async def get_stockPrices(stock_id: int, db : db_dependency):
    try:
        stock_prices = db.query(models.Stock_price).filter(models.Stock_price.stock_id == stock_id)
    except:
        raise HTTPException(status_code=404, detail="Asset not found")
    return stock_prices

# get "/assets/{symbol}" returns list of assets matching symbol


# to run uvicorn main:app --reload