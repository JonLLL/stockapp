import sqlite3
from alpaca.data.historical.stock import StockHistoricalDataClient
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from datetime import datetime
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'db'))

import config 

connection = sqlite3.connect(config.DB_FILE)
connection.row_factory = sqlite3.Row
cursor = connection.cursor()

cursor.execute("""
    SELECT id, symbol, type FROM asset WHERE type LIKE 'STOCK'
""")

rows = cursor.fetchall()

symbols = []
stock_dict = {}
for row in rows:
    symbol = row['symbol']
    symbols.append(symbol)
    stock_dict[symbol] = row['id']

client = StockHistoricalDataClient(config.API_KEY, config.SECRET_KEY)

chunk_size =200
for i in range(0, len(symbols), chunk_size):
    symbol_chunk = symbols[i:i+chunk_size]
    params = StockBarsRequest(
        symbol_or_symbols= symbol_chunk,
        start=datetime(2024, 1, 1),
        end=datetime(2024, 11, 5),
        timeframe=TimeFrame.Day
    )
    barsets = client.get_stock_bars(params).dict()
    for symbol in barsets:
        print(f"processing symbol: {symbol}")
        for bar in barsets[symbol]:
            stock_id = stock_dict[symbol]
            cursor.execute("""
                INSERT INTO stock_price (stock_id, time_stamp, open, high, low, close, volume)
                VALUES (?,?,?,?,?,?,?)
            """, (stock_id, bar['timestamp'], bar['open'], bar['high'], bar['low'],bar['close'], bar['volume']))


connection.commit()