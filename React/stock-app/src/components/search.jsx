import React, { useEffect, useState } from 'react';
import api from "../api";
// import StockPrice from './stockPrice';
import { Link } from 'react-router-dom';

function SearchDropdown () {
    const [searchTerm, setSearchTerm] = useState("");
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    // const [selectedAssetId, setSelectedAssetId] = useState(null);

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
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = assets.filter((asset)=>
            asset.symbol.startsWith(value.toUpperCase())
        );
        console.log('Filtered Assets:', filtered);
        setFilteredAssets(filtered.slice(0,5));
        setShowDropdown(filtered.length > 0 && value !== "");
        console.log(showDropdown)
        
    };

    // const handleOptionClick = (asset) => {
    //     setSelectedAssetId(asset.id);
    //     setShowDropdown(false);
    // }

    return (
        <div className="search-dropdown">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search assets..."
          />
    
          {showDropdown && (
            <ul >
              {filteredAssets.map((asset, index) => (
                <li key={index}>
                    <Link to={`/assets/${asset.id}`} onClick={() => setShowDropdown(false)}>
                        {asset.symbol} - {asset.name}
                    </Link>
                </li>
              ))}
            </ul>
          )}
          {/* {selectedAssetId && (
            <StockPrice assetId={selectedAssetId} /> 
          )} */}
        </div>
      );
}

export default SearchDropdown 