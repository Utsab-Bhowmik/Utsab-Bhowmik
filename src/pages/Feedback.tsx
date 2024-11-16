import React, { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { useStore } from '../store';

export function Feedback() {
  const { user, addFeedback, feedbacks } = useStore();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addFeedback({
      userId: user.id,
      message,
      rating,
    });
    setSubmitted(true);
    setMessage('');
    setRating(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <MessageSquare className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Your Feedback Matters</h2>
          <p className="mt-2 text-gray-600">Help us improve the voting experience</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Thank You!</h3>
            <p className="text-green-600">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate your experience
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your feedback
              </label>
              <textarea
                id="message"
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Feedback
            </button>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Feedback</h3>
          {feedbacks.length === 0 ? (
            <p className="text-gray-600 text-center">No feedback submitted yet</p>
          ) : (
            <div className="space-y-6">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-1">
                      {Array.from({ length: feedback.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {new Date(feedback.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{feedback.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}