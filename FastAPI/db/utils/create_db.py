import sqlite3, config as config

connection = sqlite3.connect(config.DB_FILE)

cursor = connection.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS asset (
        id INTEGER PRIMARY KEY,
        symbol TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
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

connection.commit()