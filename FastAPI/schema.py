from pydantic import BaseModel
from datetime import datetime

class assetBase(BaseModel):
    symbol : str
    name : str
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
