from pydantic import BaseModel
from datetime import datetime
from typing import List

class assetBase(BaseModel):
    symbol : str
    name : str
    exchange : str
    type : str

class assetModel(assetBase):
    id : int

    class Config:
        from_attributes = True

class stockPriceBase(BaseModel):
    stock_id:int
    time_stamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: int

class stockPriceModel(stockPriceBase):
    id: int

    class Config:
        from_attributes = True

class StockPriceResponse(BaseModel):
    symbol: str
    exchange: str
    prices: List[stockPriceModel]


class userBase(BaseModel):
    username: str
    password: str

class userModel(userBase):
    id: int

    class Config:
        from_attributes = True

class watchlistBase(BaseModel):
    name: str
    user_id: int


class watchlistmodel(watchlistBase):
    id: int

    class Config:
        from_attributes = True

class watchlistItemBase(BaseModel):
    watchlist_id : int
    asset_id:int

class watchlistItemmodel(watchlistItemBase):
    id: int

    class Config:
        from_attributes = True

class watchlistCreate(BaseModel):
    name: str

class LoginRequest(BaseModel):
    username: str
    password: str