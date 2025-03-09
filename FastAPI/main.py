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

@app.get("/asset/{symbol}", response_model= schema.assetModel)
async def get_asset_symbol(symbol: str, db:db_dependency):
    asset = db.query(models.Asset).filter(models.Asset.symbol == symbol).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset

# create user upon sign up
@app.post("/sign-up")
async def create_user(request :schema.SignUpRequest, db:db_dependency):

    existing_user = db.query(models.User).filter(models.User.username == request.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    exisiting_email = db.query(models.User).filter(models.User.email == request.email).first()
    if exisiting_email:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    new_user = models.User(username = request.username, password = request.password, email = request.email)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"id": new_user.id, "username": new_user.username}

# create watchlist for a user
@app.post("/user/{user_id}/watchlist", response_model=schema.watchlistResponse)
async def create_watchlist(user_id :int , watchlist: schema.watchlistCreate, db:db_dependency):
    try:
        user = db.query(models.User).filter(models.User.id == user_id).first()
    except:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_watchlist = models.Watchlist(name=watchlist.name, user_id=user.id)
    db.add(new_watchlist)
    db.commit()
    db.refresh(new_watchlist)

    return schema.watchlistResponse(name=watchlist.name, watchlist_id= new_watchlist.id, user_id=user_id, assets=[])

# login the user (verfies user and correct password)
@app.post("/login")
async def login(request :schema.LoginRequest, db:db_dependency):
    username = request.username
    password = request.password
    user = db.query(models.User).filter(models.User.username == username, models.User.password== password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {"message": "Login successfull", "user": user}

# get the users info (i.e their watchlist as of now)
@app.get("/user/{user_id}", response_model = schema.userInfo)
async def get_userInfo(user_id:int, db:db_dependency):
    try:
        user = db.query(models.User).filter(models.User.id == user_id).first()
    except:
        raise HTTPException(status_code=404, detail="User not found")
    
    #list of user watchlists
    watchlists = db.query(models.Watchlist).filter(models.Watchlist.user_id == user_id).all()

    # for list of assets
    watchlists_data = []

    for w in watchlists:
        items = db.query(models.Watchlist_Item , models.Asset).join(models.Asset, models.Watchlist_Item.asset_id == models.Asset.id).filter(models.Watchlist_Item.watchlist_id == w.id).all()
        asset_items = [schema.watchlistItemModel(asset_id= item.asset_id, asset_symbol=asset.symbol, asset_name=asset.name, id=item.id) for item, asset in items]
        watchlists_data.append(schema.watchlistResponse(name=w.name, watchlist_id=w.id, user_id=user_id, assets=asset_items))
    
    return schema.userInfo(username= user.username, watchlists=watchlists_data)

# get all assets in the watchlist
@app.get("/watchlist/{watchlist_id}", response_model=schema.watchlistResponse)
async def get_watchlistItems(user_id: int,watchlist_id:int, db:db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    watchlist = db.query(models.Watchlist).filter(models.Watchlist.user_id == user_id, models.Watchlist.id == watchlist_id).first()
    if not watchlist:
        raise HTTPException(status_code=404, detail="Watchlist for this user not found")
   
    assets = db.query(models.Watchlist_Item , models.Asset).join(models.Asset, models.Watchlist_Item.asset_id == models.Asset.id).filter(models.Watchlist_Item.watchlist_id == watchlist_id).all()
    asset_items = [schema.watchlistItemModel(asset_id= item.asset_id, asset_symbol=asset.symbol, asset_name=asset.name,id=item.id) for item, asset in assets]

    return schema.watchlistResponse(name= watchlist.name, user_id=user_id, watchlist_id=watchlist_id, assets=asset_items)

# put an asset into a users watchlist
@app.put("/user/{user_id}/{watchlist_id}", response_model=schema.watchlistResponse)
async def put_asset(user_id: int, watchlist_id :int, asset_id:int, db:db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

  
    watchlist = db.query(models.Watchlist).filter(models.Watchlist.user_id == user_id, models.Watchlist.id == watchlist_id).first()
    if not watchlist:
        raise HTTPException(status_code=404, detail="Watchlist for this user not found")
    
    existing_asset = db.query(models.Watchlist_Item).filter(models.Watchlist_Item.asset_id == asset_id, models.Watchlist_Item.watchlist_id == watchlist_id).first()
    if existing_asset:
        raise HTTPException(status_code=409, detail="Already in the watchlist")
    
    new_watchlistItem = models.Watchlist_Item(watchlist_id = watchlist_id, asset_id = asset_id)
    db.add(new_watchlistItem)
    db.commit()
    db.refresh(new_watchlistItem)

    assets = db.query(models.Watchlist_Item , models.Asset).join(models.Asset, models.Watchlist_Item.asset_id == models.Asset.id).filter(models.Watchlist_Item.watchlist_id == watchlist_id).all()
    asset_items = [schema.watchlistItemModel(asset_id= item.asset_id, asset_symbol=asset.symbol, asset_name=asset.name, id = item.id) for item, asset in assets]

    return schema.watchlistResponse(name = watchlist.name, user_id=user_id, watchlist_id=watchlist_id, assets=asset_items)

# delete an item from a users watchlist 
@app.delete("/user/{user_id}/{watchlist_id}/{watchlistItem_id}", response_model=schema.watchlistResponse)
async def delete_asset(user_id:int, watchlist_id:int, item_id:int, db:db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
  
    watchlist = db.query(models.Watchlist).filter(models.Watchlist.user_id == user_id, models.Watchlist.id == watchlist_id).first()
    if not watchlist:
        raise HTTPException(status_code=404, detail="Watchlist for this user not found")
    
    item = db.query(models.Watchlist_Item).filter(models.Watchlist_Item.id == item_id, models.Watchlist_Item.watchlist_id == watchlist_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="This item does not exist")
    
    db.delete(item)
    db.commit()
    
    assets = db.query(models.Watchlist_Item , models.Asset).join(models.Asset, models.Watchlist_Item.asset_id == models.Asset.id).filter(models.Watchlist_Item.watchlist_id == watchlist_id).all()
    asset_items = [schema.watchlistItemModel(asset_id= item.asset_id, asset_symbol=asset.symbol, asset_name=asset.name, id = item.id) for item, asset in assets]

    return schema.watchlistResponse(name=watchlist.name, user_id=user_id, watchlist_id=watchlist_id, assets= asset_items)


@app.delete("/user/{user_id}/{watchlist_id}", response_model=schema.userInfo)
async def delete_watchlist(user_id: int, watchlist_id:int, db:db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
  
    watchlist = db.query(models.Watchlist).filter(models.Watchlist.user_id == user_id, models.Watchlist.id == watchlist_id).first()
    if not watchlist:
        raise HTTPException(status_code=404, detail="Watchlist for this user not found")
    
    db.delete(watchlist)
    db.commit()

    #list of user watchlists
    watchlists = db.query(models.Watchlist).filter(models.Watchlist.user_id == user_id).all()

    # for list of assets
    watchlists_data = []

    for w in watchlists:
        items = db.query(models.Watchlist_Item , models.Asset).join(models.Asset, models.Watchlist_Item.asset_id == models.Asset.id).filter(models.Watchlist_Item.watchlist_id == w.id).all()
        asset_items = [schema.watchlistItemModel(asset_id= item.asset_id, asset_symbol=asset.symbol, asset_name=asset.name, id=item.id) for item, asset in items]
        watchlists_data.append(schema.watchlistResponse(name=w.name, user_id=user_id, watchlist_id=w.id,assets=asset_items))
    
    return schema.userInfo(username=user.username, watchlists=watchlists_data)


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