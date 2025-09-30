import React, { useState, useEffect } from 'react';
import { getPopularMovies, getTopRatedMovies } from '../api/tmdb';
import MovieCarousel from '../components/MovieCarousel';
import { Movie } from '../types';

const NewPopularPage: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch both lists in parallel for better performance
                const [popular, topRated] = await Promise.all([
                    getPopularMovies(),
                    getTopRatedMovies()
                ]);
                setPopularMovies(popular);
                setTopRatedMovies(topRated);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllMovies();
    }, []);

    if (isLoading) {
        return <div className="text-center text-slate-400 pt-32 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 pt-32 font-semibold">{error}</div>;
    }

    return (
        <div className="pt-24 pb-12 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 px-4 sm:px-8 md:px-16">Baru & Populer</h1>
            <MovieCarousel title="Paling Populer" movies={popularMovies} />
            <MovieCarousel title="Rating Tertinggi" movies={topRatedMovies} />
        </div>
    );
};

export default NewPopularPage;
