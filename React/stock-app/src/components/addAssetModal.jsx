import React, { useState} from "react";
import api from '../api';  

const fetchAssetId = async (symbol) => {
    const response = await api.get(`/asset/${symbol}`);
    return response.data.id; 
  };


const AssetModal = ({ isOpen, onClose, onAddAsset}) =>{
    const [ symbol, setSymbol] = useState('')
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!symbol.trim()) return;

        try {
            const asset_id = await fetchAssetId(symbol); // Get asset_id by symbol
      
            if (asset_id) {
              onAddAsset(asset_id); // Add asset using the fetched asset_id
              setSymbol(""); // Clear input after adding
              onClose(); // Close modal
            } else {
              setError("Asset not found"); // Handle case when asset_id is not found
            }
          } catch (err) {
            setError("Asset not found");
            console.log(err)
          }
      };

    const handleCancel = () =>{
      setError("")
      setSymbol("")
      onClose();
    }

      return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
          <div style={{
                    background: "white",
                    height: 120,
                    width: 400,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}>
            <h3 className = "text-black" >Add an Asset</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Asset Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              />
              <button className="button"type="submit">Add</button>
              <button className="button" type="button" onClick={handleCancel}>Cancel</button>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      );

};

export default AssetModal