import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'db'))
import sqlite3, config

connection = sqlite3.connect(config.DB_FILE)

cursor = connection.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS asset (
        id INTEGER PRIMARY KEY,
        symbol TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        exchange TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('STOCK','CRYPTO'))
        )
""")
cursor.execute("""
    CREATE TABLE IF NOT EXISTS stock_price (
        id INTEGER PRIMARY KEY,
        stock_id INTEGER,
        time_stamp NOT NULL,
        open NOT NULL,
        high NOT NULL,
        low NOT NULL,
        close NOT NULL,
        volume NOT NULL,
        FOREIGN KEY (stock_id) REFERENCES asset (id)
        )
""")

# cursor.execute("""
#     CREATE TABLE IF NOT EXISTS user (
#         id INTEGER PRIMARY KEY,
#         username TEXT NOT NULL UNIQUE,
#         password TEXT NOT NULL
#         )
# """)


# CREATE TABLE watchlists (
#     watchlist_id INTEGER PRIMARY KEY,
#     user_id INTEGER NOT NULL,
#     name VARCHAR(100) NOT NULL,
#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
# );

# CREATE TABLE watchlist_items (
#     watchlist_item_id INTEGERL PRIMARY KEY,
#     watchlist_id INTEGER NOT NULL,
#     asset_id INTEGER NOT NULL,
#     added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     FOREIGN KEY (watchlist_id) REFERENCES watchlists(watchlist_id) ON DELETE CASCADE,
#     FOREIGN KEY (asset_id) REFERENCES assets(asset_id) ON DELETE CASCADE
# );


connection.commit()