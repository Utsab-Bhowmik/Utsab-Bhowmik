import React from 'react';
import { BarChart3, Users } from 'lucide-react';
import { useStore } from '../store';

export function Results() {
  const { candidates } = useStore();
  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <BarChart3 className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Election Results</h2>
          <div className="mt-2 flex items-center justify-center text-gray-600">
            <Users className="h-5 w-5 mr-2" />
            <span>Total Votes: {totalVotes}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          {candidates.map((candidate) => {
            const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
            
            return (
              <div key={candidate.id} className="mb-8 last:mb-0">
                <div className="flex items-center mb-2">
                  <img
                    src={candidate.imageUrl}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-indigo-600">{candidate.party}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">
                      {percentage.toFixed(1)}%
                    </span>
                    <p className="text-sm text-gray-600">{candidate.votes} votes</p>
                  </div>
                </div>
                
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}