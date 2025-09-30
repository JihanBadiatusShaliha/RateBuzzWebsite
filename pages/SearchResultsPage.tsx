import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types';

const SearchResultsPage: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movies = await searchMovies(query);
        setResults(movies);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred while searching.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-slate-400 py-20">Searching for movies...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500 py-20">{error}</p>;
    }
    
    if (results.length > 0) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      );
    }
    
    return (
      <div className="text-center py-20">
        <p className="text-xl text-slate-400">Tidak ada film yang ditemukan.</p>
        <p className="text-slate-500 mt-2">Coba cari dengan kata kunci lain.</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Hasil Pencarian</h1>
      <p className="text-slate-400 text-lg mb-8">
        Menampilkan hasil untuk: <span className="font-bold text-white">"{query}"</span>
      </p>
      {renderContent()}
    </div>
  );
};

export default SearchResultsPage;
