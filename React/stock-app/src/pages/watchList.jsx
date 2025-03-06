// individual watchlist page where you can sort and modify watch list properties (i.e name, add and remove stocks and delete the watchlist fully)
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import api from '../api';  
import AssetModal from "../components/addAssetModal";

function Watchlist() { 
    const watchlistId = useParams();
    const [assets, setAssets] = useState([]);
    const [watchlistName, setWatchlistName] = useState("");
    const storedUser =  JSON.parse(localStorage.getItem("user"));
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await api.get(`/watchlist/${watchlistId.watchlistId}`,{
                params: {
                    watchlist_id : watchlistId.watchlistId,
                    user_id : storedUser.user.id
                }
            }
        );
        setAssets(response.data.assets);
        setWatchlistName(response.data.name)
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, [watchlistId, storedUser.user.id]);

    const handleAddAsset = async (asset_id) => {
        try {
            const response = await api.put(`/user/${storedUser.user.id}/${watchlistId.watchlistId}?asset_id=${asset_id}`);
            setAssets(response.data.assets)
        } catch (error) {
            console.error("Error adding asset", error);
        }
    };

  return (
    <div>
      <h2>{watchlistName}</h2>
        <div>
            <button onClick={() =>setIsAddModalOpen(true) }>+</button>
            <button>edit</button>
        </div>
        <ul>
        {assets.map((asset) => (
            <li key={asset.asset_id}>
            <Link to={`/assets/${asset.asset_id}`}>
                {asset.asset_symbol} - {asset.asset_name}
            </Link>
            </li>
        ))}
        </ul>
        <AssetModal
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onAddAsset={handleAddAsset} 
        />
    </div>
  );
}


export default Watchlist