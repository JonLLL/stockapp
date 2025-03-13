import React, { useState} from "react";

const WatchlistModal = ({ isOpen, onClose, onAddWatchlist }) => {
  const [name, setName] = useState("");
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddWatchlist(name);
    setName(""); // Clear input after adding
    onClose(); // Close modal
  };

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
        <h3 className = "text-black">Create New Watchlist</h3>
        <form onSubmit={handleSubmit}className = "text-black">
          <input
            type="text"
            placeholder="Watchlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="button" type="submit">Add</button>
          <button  className="button"type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default WatchlistModal;
