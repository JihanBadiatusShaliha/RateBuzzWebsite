
import React from 'react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="group relative flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3">
          <h3 className="text-white text-md font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">{movie.title}</h3>
          <div className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <StarRating rating={movie.rating} size="sm" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
