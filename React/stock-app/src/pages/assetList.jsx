import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';  

// might implement the laoding screen
function AssetList() {
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 30;

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

  const totalPages = Math.ceil(assets.length / pageSize);
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleData = assets.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-xl font-bold">Asset List</h2>
      <ul>
        {visibleData.map((asset) => (
          <li key={asset.id}>
            <Link to={`/assets/${asset.id}`}>
              {asset.symbol} - {asset.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{page}/{totalPages}</span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev < Math.ceil(assets.length / pageSize) ? prev + 1 : prev
            )
          }
          disabled={page >= Math.ceil(assets.length / pageSize)}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AssetList;
