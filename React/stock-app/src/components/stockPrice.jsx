import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';  

function StockPrice(){
    const { assetId } = useParams();
    const[prices, setPrices] = useState([]);
    
    useEffect(() => {
        const fetchPrices = async () => {
        try {
            const response = await api.get(`/assets/${assetId}`);
            setPrices(response);
        } catch (error) {
            console.error('Error fetching assets price:', error);
        }
        };
        fetchPrices();
    }, [assetId]);

    return (
        <div>
          <h2>Price History</h2>
          {prices.length === 0 ? (
            <p>Prices Currently not available</p>
          ):(
          <ul>
            {prices.map((price, index) => (
              <li key={index}>
                {price.time_stamp} - open: {price.open}, close: {price.close}, high: {price.high}, low: {price.low} , volume:{price.volume}
              </li>
            ))}
          </ul>
          )}
        </div>
      );
}



export default StockPrice;