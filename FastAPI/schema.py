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
