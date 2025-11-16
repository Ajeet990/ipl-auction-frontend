import React from 'react'

const AllPlayers = ({ players, selectedPlayer, onSelectPlayer }) => {
  // console.log('AllPlayers rendered with players:', players, 'and selectedPlayer:', selectedPlayer);
  return (
    <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Players</h2>
      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            onClick={() => onSelectPlayer(player)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedPlayer?.id === player.id
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-white hover:bg-gray-50 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-semibold text-lg ${
                  selectedPlayer?.id === player.id ? 'text-white' : 'text-gray-800'
                }`}>
                  {player.name}
                </h3>
                <p className={`text-sm ${
                  selectedPlayer?.id === player.id ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {player.category}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  selectedPlayer?.id === player.id ? 'text-white' : 'text-gray-800'
                }`}>
                  ${player.price}
                </p>
                <p className={`text-sm ${
                  selectedPlayer?.id === player.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  Stock: {player.stock}
                </p>
              </div>
            </div>
            {selectedPlayer?.id === player.id && (
              <div className="mt-2 text-xs font-semibold text-blue-100">
                ✓ SELECTED
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPlayers;
