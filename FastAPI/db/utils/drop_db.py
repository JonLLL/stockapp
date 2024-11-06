import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'db'))

import sqlite3, config

connection = sqlite3.connect(config.DB_FILE)

cursor = connection.cursor()

cursor.execute("""
    DROP TABLE stock_price
""")
cursor.execute("""
    DROP TABLE asset
""")


connection.commit()