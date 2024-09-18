import React, { useEffect, useState } from 'react';
import api from '../api';  

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await api.get('/stocks');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <h1>Stock List</h1>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>
            {stock.symbol} - {stock.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;
