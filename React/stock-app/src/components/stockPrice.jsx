import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';  
import TradingViewWidget from './TradingViewWidget';

function StockPrice(){
    const { assetId } = useParams();
    const[prices, setPrices] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [exchange, setExchange] = useState("");
    const [page, setPage] = useState(0);
    const pageSize = 30;
    
    
    useEffect(() => {
        const fetchPrices = async () => {
        try {
            const response = await api.get(`/assets/${assetId}`);
            setPrices(response.data.prices);
            setSymbol(response.data.symbol);
            setExchange(response.data.exchange);
        } catch (error) {
            console.error('Error fetching assets price:', error);
        }
        };
        fetchPrices();
    }, [assetId]);
    const totalPages = Math.ceil(prices.length / pageSize);
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleData = prices.slice(startIndex, endIndex);

    return (
        <div>
         <h3>{exchange}:{symbol}</h3>
            <div style={{ width: '100%', height: '500px' }}>
              <TradingViewWidget symbol = {symbol} exchange = {exchange}/>
            </div>
          <h4>Price History - From :1/2/2024  To: 11/30/2024</h4>
          {prices.length === 0 ? (
            <p>Prices Currently not available</p>
          ):(
              <>
              <div>
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                  >
                    ◀ 
                  </button>
                  <span> Page {page + 1} of {totalPages} </span>
                  <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page >= totalPages - 1}
                  >
                     ▶
                  </button>
                </div>
                  <table border="1" style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Open</th>
                        <th>Close</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Volume</th>
                      </tr>
                    </thead>
                      <tbody>
                        {visibleData.map((price, index) => (
                          <tr key={index}>
                            <td>{price.time_stamp}</td>
                            <td>{price.open}</td>
                            <td>{price.close}</td>
                            <td>{price.high}</td>
                            <td>{price.low}</td>
                            <td>{price.volume}</td>
                          </tr>
                        ))}
                      </tbody>
                </table>
              </>
            )}
          
        </div>
      );
}



export default StockPrice;