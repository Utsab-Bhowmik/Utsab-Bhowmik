export interface User {
  id: string;
  name: string;
  email: string;
  hasVoted: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  imageUrl: string;
  votes: number;
}

export interface Feedback {
  id: string;
  userId: string;
  message: string;
  rating: number;
  timestamp: Date;
}