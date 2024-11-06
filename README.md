# stockapp
This is a personal project where i am replicating a stock watching/ trading application <br>
Front end - React.js<br>
Backend - Python, Fastapi <br>
Database - SQLite <br>
Utilizing aplaca api for real time market data including crypto, polygon.io api for minute data <br>
## MVP
users must be able to log in and log out <br>
users can add stocks into a watch list<br>
users can search up the stock/crypto assets✔️<br>
users must be able to graphically view stock/crypto and candle sticks ✔️<br>
option for users to view in different time ranges (hourly, monthly, yearly, etc)<br>
watch list data/ user data is retained in database <br>
user can apply trading algorithms to stocks they choose <br>
database must be automatically updated regularly to have up to date date (task scheduling) <br>
## Features
A model that determines whether market data is bullish or bearish <br>
A machine learning model that will take a stock's pattern and match it with a chart pattern that most similarly represents it <br>
## Credit
Part Time Larry stock trading app tutorial for inspiration and design<br>
Eric roby React + FastAPI (full-stack guide) for stack implmentation guide<br>
Rithmic React & FastAPI for stack implementation guide<br>
### Updates
8/31 - research and flush out applicaiton purpose <br>
9/1 - database design and setup <br>
9/11 - reorganize files and start implementation of fast api, react setup<br>
9/17 - implemented a basic ui for a home page as well as stock list page, also connectd api using axios<br>
10/20 - implemented search component and asset price component<br>
11/5 - refactor database schema and query response. implement tradview widget for detailed charts. <br>

### bugs
11/5 - react strictmode cleanup for tradeview widget: null type error<br>

