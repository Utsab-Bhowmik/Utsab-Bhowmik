import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, LogOut } from 'lucide-react';
import { useStore } from '../store';

export function Navbar() {
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Vote className="h-8 w-8" />
            <span className="font-bold text-xl">VoteWise</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/candidates" className="hover:text-indigo-200">Candidates</Link>
                <Link to="/results" className="hover:text-indigo-200">Results</Link>
                <Link to="/feedback" className="hover:text-indigo-200">Feedback</Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-indigo-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-200">Login</Link>
                <Link to="/register" className="hover:text-indigo-200">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}