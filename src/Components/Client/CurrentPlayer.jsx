
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../Config/Constants';
import axios from 'axios';
import echo from '../../Config/echo';


export const CurrentPlayer = () => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [bidName, setBidName] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('Setting up Echo connection...');
    
    // Fetch initial current player
    axios.get(`${API_BASE_URL}/player/current-bidder`)
      .then(response => {
        console.log('Fetched current player:', response.data.data);
        setCurrentPlayer(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching current player:', error);
      });

    // Subscribe to the auction channel
    const channel = echo.channel('auction');

    // Listen for connection
    channel.on('pusher:subscription_succeeded', () => {
      console.log('✅ Connected to auction channel');
      setIsConnected(true);
    });

    // Listen for player selection events
    channel.listen('.player.selected', (event) => {
      console.log('🎯 Player selected via Reverb:', event);
      console.log('Player data:', event.player);
      setCurrentPlayer(event.player);
      
      // Clear bid form when new player is selected
      setBidName('');
      setBidAmount('');
    });

    // Cleanup on unmount
    return () => {
      console.log('Component unmounting, leaving auction channel');
      echo.leaveChannel('auction');
    };
  }, []); // ✅ Empty array - run only once on mount

  const submitBid = () => {
    if (!bidName || !bidAmount) {
      alert("Please fill both fields");
      return;
    }

    if (!currentPlayer) {
      alert("No player selected");
      return;
    }

    axios.post(`${API_BASE_URL}/bid/submit-bid`, {
      bidder_name: bidName,
      amount: parseFloat(bidAmount),
      player_id: currentPlayer.id
    })
    .then(response => {
      alert("Bid submitted successfully!");
      setBidName('');
      setBidAmount('');
    })
    .catch(error => {
      console.error('Error submitting bid:', error);
      alert("Failed to submit bid. Please try again.");
    });
  };

  const getRoleName = (role) => {
    const roles = {
      1: 'Wicket Keeper',
      2: 'Batter',
      3: 'Bowler',
      4: 'All Rounder'
    };
    return roles[role] || 'Unknown';
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        
        {/* Connection Status Indicator */}
        <div className="mb-4 flex items-center justify-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className={`text-xs font-semibold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? 'Live' : 'Connecting...'}
          </span>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Current Player
        </h2>

        {currentPlayer ? (
          <div className="mb-6 space-y-2 bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {currentPlayer.name}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Role:</span> {getRoleName(currentPlayer.role)}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Experience:</span> {currentPlayer.playing_experience} years
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Nationality:</span> {currentPlayer.nationality || 'N/A'}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Base Price:</span> ${currentPlayer.base_price || 0}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center mb-6">Loading...</p>
        )}

        {/* Input Fields */}
        <div className="space-y-4 mb-4">
          
          <div>
            <label className="block mb-1 font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              value={bidName}
              onChange={(e) => setBidName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Bid Amount</label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Enter bid amount"
              min={currentPlayer?.base_price || 0}
            />
          </div>

        </div>

        {/* Submit Button */}
        <button
          onClick={submitBid}
          disabled={!currentPlayer}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Bid
        </button>

      </div>
    </div>
  );
};

export default CurrentPlayer;