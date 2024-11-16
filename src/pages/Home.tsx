import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, UserPlus, BarChart3, MessageSquare } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl mb-8">
            Welcome to <span className="text-indigo-600">VoteWise</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted platform for secure and transparent online voting. Make your voice heard!
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: UserPlus,
              title: 'Register',
              description: 'Create your account to start voting',
              action: () => navigate('/register'),
            },
            {
              icon: Vote,
              title: 'Cast Vote',
              description: 'View candidates and cast your vote',
              action: () => navigate('/candidates'),
            },
            {
              icon: BarChart3,
              title: 'Results',
              description: 'View live election results',
              action: () => navigate('/results'),
            },
            {
              icon: MessageSquare,
              title: 'Feedback',
              description: 'Share your voting experience',
              action: () => navigate('/feedback'),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={item.action}
            >
              <item.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-indigo-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Why Choose VoteWise?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p>State-of-the-art encryption and verification systems</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Transparent</h3>
              <p>Real-time results and complete audit trail</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Accessible</h3>
              <p>Vote from anywhere, anytime with ease</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}