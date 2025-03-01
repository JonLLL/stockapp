from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship

class Asset(Base):
    __tablename__ = 'asset'

    id = Column(Integer, primary_key=True, index =True)
    symbol = Column(String, unique=True, index = True)
    name = Column(String)
    exchange = Column(String)
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

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key= True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    email = Column(String, nullable = False, unique = True)

    watchlist = relationship("Watchlist", back_populates="user")

class Watchlist(Base):
    __tablename__ = 'watchlist'

    id = Column(Integer, primary_key= True, index=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'), nullable = False)

    user = relationship("User", back_populates="watchlist") 
    items = relationship("Watchlist_Item", back_populates="watchlist", cascade="all, delete")

class Watchlist_Item(Base):
    __tablename__ = "watchlist_items"

    id = Column(Integer, primary_key = True, index = True)
    watchlist_id = Column(Integer, ForeignKey('watchlist.id'), nullable = False)
    asset_id = Column(Integer, ForeignKey('asset.id'), nullable = False)

    watchlist = relationship("Watchlist", back_populates = "items")
    asset = relationship("Asset")





