import React, { useEffect, useState } from "react";
import AllPlayers from "../../Components/Admin/AllPlayes";
import SelectedPlayer from "../../Components/Admin/SelectedPlayer";
import AddPlayer from "../../Components/Admin/AddPlayer";
import { API_BASE_URL } from "../../Config/Constants";
import axios from "axios";
import echo from '../../Config/echo';


const AdminPage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract fetch logic into a separate function
  const fetchPlayers = () => {
    axios.get(`${API_BASE_URL}/player`)
      .then(response => {
        console.log('Fetched players:', response.data.data);
        setPlayers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
  };

  // Fetch on component mount
  useEffect(() => {
    fetchPlayers();
  }, []);

  const markCurrentPlayer = (playerId) => {
    axios.post(`${API_BASE_URL}/player/mark-current`, { player_id: playerId })
      .then(response => {
        console.log('Marked current player:', response.data);
      })
      .catch(error => {
        console.error('Error marking current player:', error);
      });
  }

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
    const filteredPlayers = players.filter(p => p.id !== player.id);
    setPlayers([player, ...filteredPlayers]);
    markCurrentPlayer(player.id);
  };

  // This will be called after adding a new player
  const handleAddNewPlayer = () => {
    fetchPlayers(); // Refresh the list
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Player Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Player
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <AllPlayers
          players={players}
          selectedPlayer={selectedPlayer}
          onSelectPlayer={handleSelectPlayer}
        />
        <SelectedPlayer selectedPlayer={selectedPlayer} />
      </div>

      <AddPlayer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPlayer={handleAddNewPlayer}
      />
    </div>
  );
};

export default AdminPage;
