import sqlite3, config as config

connection = sqlite3.connect(config.DB_FILE)

cursor = connection.cursor()

cursor.execute("""
    DROP TABLE stock_price
""")
cursor.execute("""
    DROP TABLE asset
""")


connection.commit()