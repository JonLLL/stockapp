import React, { useEffect, useState } from 'react';
import api from '../api';  

// might implement the laoding screen
function AssetList() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await api.get('/assets');
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
        {assets.map((asset, index) => (
          <li key={index}>
            {asset.symbol} - {asset.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssetList;
