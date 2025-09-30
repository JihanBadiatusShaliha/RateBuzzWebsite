import React, { useState, useEffect } from 'react';
import { getGenres, getMoviesByGenre } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types';

interface Genre {
  id: number;
  name: string;
}

const GenrePage: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const apiGenres = await getGenres();
      setGenres(apiGenres);
    };
    fetchGenres();
  }, []);
  
  const handleGenreSelect = async (genre: Genre) => {
    setSelectedGenre(genre);
    setIsLoading(true);
    const moviesByGenre = await getMoviesByGenre(genre.id);
    setMovies(moviesByGenre);
    setIsLoading(false);
  }
  
  const clearSelection = () => {
    setSelectedGenre(null);
    setMovies([]);
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Jelajahi Berdasarkan Genre</h1>
      
      <div className="flex flex-wrap gap-3 mb-8">
        {genres.map(genre => (
          <button
            key={genre.id}
            onClick={() => handleGenreSelect(genre)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedGenre?.id === genre.id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            {genre.name}
          </button>
        ))}
        {selectedGenre && (
           <button
            onClick={clearSelection}
            className="px-4 py-2 rounded-full font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400"
          >
            &times; Clear
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="text-slate-400 text-center py-10">Loading movies...</p>
      ) : selectedGenre ? (
        movies.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-10">
            Tidak ada film yang ditemukan untuk genre "{selectedGenre.name}".
          </p>
        )
      ) : (
        <p className="text-slate-400 text-center py-10">
          Pilih genre di atas untuk mulai menjelajah.
        </p>
      )}
    </div>
  );
};

export default GenrePage;
