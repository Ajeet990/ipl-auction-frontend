import React from 'react'

const SelectedPlayer = ({ selectedPlayer }) => {
  return (
    <div className="w-1/2 p-6 overflow-y-auto bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Player Details</h2>
      {selectedPlayer ? (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedPlayer.name}
            </h3>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {selectedPlayer.category}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Base Price</p>
              <p className="text-2xl font-bold text-gray-800">
                ${selectedPlayer.base_price}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Best Bid Price</p>
              <p className="text-2xl font-bold text-gray-800">
                $0
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              Edit Player
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
              View History
            </button>
            <button className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors font-semibold">
              Delete Player
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-lg">Select a product to view details</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedPlayer;