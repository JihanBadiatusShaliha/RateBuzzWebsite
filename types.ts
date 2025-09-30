
export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  description: string;
  genre: string[];
  releaseYear: number;
  rating: number;
  // Reviews are now sourced from User objects
  streamingSources: StreamingSource[];
}

export interface Review {
  id: number;
  author: string; // username
  comment: string;
  rating: number; // out of 10
  movieId: number;
  movieTitle: string;
  moviePosterUrl: string;
}

export interface StreamingSource {
  platform: string;
  url: string;
}

export interface MovieCategory {
    title: string;
    movies: Movie[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  profilePictureUrl: string;
  friends: number[]; // Array of user IDs
  reviews: Review[];
  description?: string; // Add user description/bio
}