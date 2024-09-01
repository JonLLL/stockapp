import sqlite3
import alpaca_trade_api as tradeapi

connection = sqlite3.connect('app.db')
cursor = connection.cursor()
api = tradeapi.REST('PKK3IWAXU19O3UT7ZRYW', 'en4JhZS7I311BcDUrgZWGrkhwLUqK0m3Pw9jGB1q', 'https://paper-api.alpaca.markets')
assets = api.list_assets()

for asset in assets:
    try:
        if asset.status == 'active' and asset.tradable:
            cursor.execute("INSERT INTO stock (symbol, company) VALUES (?,?)", (asset.symbol, asset.name))
    except Exception as e:
        print(asset.symbol)
        print(e)

connection.commit()