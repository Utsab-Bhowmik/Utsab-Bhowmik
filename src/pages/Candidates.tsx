import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertTriangle } from 'lucide-react';
import { useStore } from '../store';

export function Candidates() {
  const navigate = useNavigate();
  const { user, candidates, castVote } = useStore();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (user.hasVoted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Check className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">You've Already Voted!</h2>
          <p className="mt-2 text-gray-600">Thank you for participating in the election.</p>
          <button
            onClick={() => navigate('/results')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  const handleVote = () => {
    if (selectedCandidate) {
      castVote(selectedCandidate);
      navigate('/results');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Cast Your Vote</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all ${
                selectedCandidate === candidate.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => {
                setSelectedCandidate(candidate.id);
                setShowConfirmation(true);
              }}
            >
              <img
                src={candidate.imageUrl}
                alt={candidate.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                <p className="text-indigo-600 font-medium">{candidate.party}</p>
                <p className="mt-2 text-gray-600">{candidate.description}</p>
              </div>
            </div>
          ))}
        </div>

        {showConfirmation && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-center mb-4">Confirm Your Vote</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to vote for {candidates.find(c => c.id === selectedCandidate)?.name}?
                This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleVote}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Confirm Vote
                </button>
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setSelectedCandidate(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}