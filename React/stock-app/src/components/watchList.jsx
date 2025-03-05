// individual watchlist page where you can sort and modify watch list properties (i.e name, add and remove stocks and delete the watchlist fully)
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import api from '../api';  


function Watchlist() { 
    const watchlistId = useParams();
    const [assets, setAssets] = useState([]);
    const [watchlistName, setWatchlistName] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const storedUser =  JSON.parse(localStorage.getItem("user"));
        const response = await api.get(`/watchlist/${watchlistId.watchlistId}`,{
                params: {
                    watchlist_id : watchlistId.watchlistId,
                    user_id : storedUser.user.id
                }
            }
        );
        setAssets(response.data.assets);
        setWatchlistName(response.data.name)
        console.log(assets)
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, [watchlistId]);

 
  return (
    <div>
      <h2>{watchlistName}</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset.id}>
            <Link to={`/assets/${asset.asset_id}`}>
              {asset.asset_symbol} - {asset.asset_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Watchlist