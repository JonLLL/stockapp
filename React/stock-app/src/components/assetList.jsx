import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';  

// might implement the laoding screen
function AssetList() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await api.get('/assets');
        console.log('Assets response:', response.data);
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

 
  return (
    <div>
      <h2>Asset List</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset.id}>
            <Link to={`/assets/${asset.id}`}>
              {asset.symbol} - {asset.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssetList;
