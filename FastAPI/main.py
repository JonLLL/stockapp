import models, services, schema
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from database import sessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

# for react server
origins = [
    'http://localhost:3000'
]

# app.add_middleware(CORSMiddleware, allow_origins = origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change for security purposes)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)
db_dependency = Annotated[Session,Depends(services.get_db)]

# models.Base.metadata.create_all(bind = engine)

# get all stocks in database
@app.get("/assets", response_model=List[schema.assetModel])
async def get_assets(db : db_dependency):#, skip: int = 0, limit: int = 100):
    assets = db.query(models.Asset).order_by(models.Asset.symbol.asc()).all()#.offset(skip).limit(limit).all()
    return assets

# get stockprice by id, daily data sorted by date 
@app.get("/assets/{stock_id}", response_model=schema.StockPriceResponse)
async def get_stockPrices(stock_id: int, db : db_dependency):
    try:
        stock = db.query(models.Asset).filter(models.Asset.id == stock_id).first()
        if not stock:
            raise HTTPException(status_code=404, detail="Asset not found")
        stock_prices = db.query(models.Stock_price).filter(models.Stock_price.stock_id == stock_id).order_by(models.Stock_price.time_stamp.desc())
    except:
        raise HTTPException(status_code=404, detail="Asset not found")
    return schema.StockPriceResponse(
            symbol=stock.symbol,
            exchange=stock.exchange,
            prices=stock_prices
        )

@app.post("/sign-up")
async def create_user(user: schema.userModel, db:db_dependency):
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = models.User(username = user.username, password = user.password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"id": new_user.id, "username": new_user.username}

@app.post("/user={user_id}/watchlist", response_model=schema.watchlistCreate)
async def create_watchlist(user_id :int , watchlist: schema.watchlistCreate, db:db_dependency):
    try:
        user = db.query(models.User).filter(models.User.id == user_id).first()
    except:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_watchlist = models.Watchlist(name=watchlist.name, user_id=user.id)
    db.add(new_watchlist)
    db.commit()
    db.refresh(new_watchlist)

    return new_watchlist

@app.post("/login")
async def login(request :schema.LoginRequest, db:db_dependency):
    username = request.username
    password = request.password
    user = db.query(models.User).filter(models.User.username == username, models.User.password== password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {"message": "Login successfull", "user": user}

#returns list of assets matching symbol
# @app.get("/search/{symbol}", response_model=List[schema.assetModel])
# async def get_assets(symbol: str, db: db_dependency): 
#     assets = db.query(models.Asset).filter(models.Asset.symbol.ilike(f'%{symbol}%')).all()
#     if not assets:
#         return []
#     return assets

# create a new user
# @app.post("/login")
# async def creat_user(username: str, password: str, db: db_dependency):
#     try:
#         db.add
#     except:
#         raise HTTPException(status_code=200, detail="username already exists")




# to run uvicorn main:app --reload