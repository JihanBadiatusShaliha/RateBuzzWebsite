import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { getPopularMovies } from '../api/tmdb';

const AllMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Failed to fetch movies for All Movies page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">All Popular Movies</h1>
      {isLoading ? (
        <div className="text-center py-20">
          <p className="text-xl text-slate-400">Loading movies...</p>
        </div>
      ) : movies.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-slate-400">No movies found or failed to load.</p>
        </div>
      )}
    </div>
  );
};

export default AllMoviesPage;