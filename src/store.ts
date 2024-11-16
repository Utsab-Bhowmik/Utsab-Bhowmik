import { create } from 'zustand';
import { User, Candidate, Feedback } from './types';

interface VotingStore {
  user: User | null;
  candidates: Candidate[];
  feedbacks: Feedback[];
  setUser: (user: User | null) => void;
  castVote: (candidateId: string) => void;
  addFeedback: (feedback: Omit<Feedback, 'id' | 'timestamp'>) => void;
}

export const useStore = create<VotingStore>((set) => ({
  user: null,
  candidates: [
    {
      id: '1',
      name: 'Sarah Johnson',
      party: 'Progressive Party',
      description: 'Advocating for technological innovation and environmental sustainability',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      votes: 0,
    },
    {
      id: '2',
      name: 'Michael Chen',
      party: 'Unity Alliance',
      description: 'Fighting for economic equality and social justice',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      votes: 0,
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      party: 'Future Forward',
      description: 'Building bridges across communities for a stronger tomorrow',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      votes: 0,
    },
  ],
  feedbacks: [],
  setUser: (user) => set({ user }),
  castVote: (candidateId) =>
    set((state) => ({
      candidates: state.candidates.map((c) =>
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      ),
      user: state.user ? { ...state.user, hasVoted: true } : null,
    })),
  addFeedback: (feedback) =>
    set((state) => ({
      feedbacks: [
        ...state.feedbacks,
        { ...feedback, id: Math.random().toString(), timestamp: new Date() },
      ],
    })),
}));