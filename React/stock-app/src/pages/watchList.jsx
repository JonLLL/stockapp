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
    const [isEditMode, setIsEditMode] = useState(false);

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
            const response = await api.put(`/user/${storedUser.user.id}/${watchlistId.watchlistId}/${asset_id}`);
            setAssets(response.data.assets)
        } catch (error) {
            console.error("Error adding asset", error);
        }
    };

    const handleDeleteAsset = async (item_id) => {
      console.log("deleteing item: ",item_id);
      try{
        const response = await api.delete(`/user/${storedUser.user.id}/${watchlistId.watchlistId}/${item_id}`,{
            params: {
              user_id: storedUser.user.id,
              watchlist_id: watchlistId.watchlistId,
              item_id: item_id
            }
          }
        );
        setAssets(response.data.assets)
      }catch(error){
        console.error("error deleteing item",error);
      }
    }

    const handleUpdateWatchlistName = async () =>{
      try{
        await api.put(`/user/${storedUser.user.id}/${watchlistId.watchlistId}`,{
          name : watchlistName
        });
        setIsEditMode(false);
      }catch(error){
        console.error("error updating watchlist name", error)
      }

    }

  return (
    <div>
      <div>
        <h2>{isEditMode ? (<input
                type="text"
                value={watchlistName}
                onChange={(e) => setWatchlistName(e.target.value)}
              />):(
                watchlistName
                )}</h2>
      </div>
        <div>
            <button onClick={() =>setIsAddModalOpen(true) }>+</button>
            <button onClick={() => {
              if(isEditMode){
                handleUpdateWatchlistName();
              }
              setIsEditMode(!isEditMode)
            }

            }>{isEditMode? "done": "edit"}</button>
        </div>
        <ul>
        {assets.map((asset) => (
            <li key={asset.asset_id} style={{ display: 'flex', alignItems: 'center' }}>
               {isEditMode ? (
                            <button 
                                onClick={() => handleDeleteAsset(asset.id)} 
                                style={{ color: 'red', marginRight: '10px' }}
                            >
                                X
                            </button>
                        ):(null)}
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