import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../api/tmdb';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Gagal memuat film: ${err.message}. Pastikan VITE_TMDB_TOKEN sudah benar.`);
                } else {
                    setError('Terjadi kesalahan yang tidak diketahui.');
                }
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const heroMovie = movies.length > 0 ? movies[0] : null;

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center text-slate-400 py-10 text-lg">Loading movies...</div>;
        }

        if (error) {
            return <div className="text-center text-red-500 py-10 font-semibold bg-red-900/20 rounded-lg">{error}</div>;
        }

        if (movies.length === 0) {
            return <div className="text-center text-slate-400 py-10">Tidak ada film ditemukan.</div>;
        }

        return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        );
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section - Tampil hanya jika data berhasil dimuat */}
            {!isLoading && !error && heroMovie && (
                 <div className="relative h-[60vh] md:h-[80vh] w-full -mt-20">
                    <img 
                        src={heroMovie.posterUrl.replace('w500', 'original')} 
                        alt={heroMovie.title} 
                        className="w-full h-full object-cover object-top" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 sm:p-8 md:p-16 w-full md:w-1/2 lg:w-2/5">
                        <h1 className="text-3xl md:text-5xl font-black mb-4 text-white">{heroMovie.title}</h1>
                        <p className="text-slate-300 hidden md:block mb-6 line-clamp-3">{heroMovie.description}</p>
                        <div className="flex space-x-4">
                            <Link to={`/movie/${heroMovie.id}`} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition-colors flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Info Lengkap
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Grid Film Populer */}
            <div className="container mx-auto px-4 sm:px-8 md:px-16 py-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Film Populer</h2>
                {renderContent()}
            </div>
        </div>
    );
};

export default HomePage;
