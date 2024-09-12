from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship

class Asset(Base):
    __tablename__ = 'asset'

    id = Column(Integer, primary_key=True, index =True)
    symbol = Column(String, unique=True, index = True)
    name = Column(String)
    type = Column(String)

    prices = relationship("Stock_price", back_populates="asset")

    # watchlists = relationship("Watchlist", secondary=watchlist_asset_association, back_populates="assets")

class Stock_price(Base):
    __tablename__ = 'stock_price'

    id = Column(Integer, primary_key= True, index=True)
    stock_id = Column(Integer, ForeignKey('asset.id'), nullable=False)
    time_stamp = Column(DateTime, nullable=False)
    open = Column(Float, nullable=False)
    high = Column(Float, nullable=False)
    low = Column(Float, nullable=False)
    close = Column(Float, nullable=False)
    volume = Column(Float, nullable=False)

    asset = relationship("Asset", back_populates="prices")

# class User(Base):
#     __tablename__ = 'user'

#     id = Column(Integer, primary_key= True, index=True)
#     username = Column(String, nullable=False)
#     password = Column(String, nullable=False)
#     watchlist_id = Column(Integer, ForeignKey('watchlist.id'), nullable=False)

#     watchlist = relationship("Watchlist", back_populates="user", uselist=False)

# class Watchlist(Base):
#     __tablename__ = 'watchlist'
#     id = Column(Integer, primary_key= True, index=True)
#     stock_id = Column(Integer, ForeignKey('asset.id'), nullable=False)

#     asset = relationship("Asset", secondary=watchlist_asset_association, back_populates="watchlists")
#     user = relationship("User", back_populates="watchlist") 




