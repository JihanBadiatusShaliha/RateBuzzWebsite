import axios from 'axios';
import { Movie } from '../types';

// --- KONFIGURASI API ---

// FIX: Hardcode the token directly. The previous method using import.meta.env
// is not supported in this environment and was causing the app to crash,
// resulting in a blank screen.
// 
// !!! PENTING: Ganti string di bawah ini dengan Bearer Token TMDb Anda !!!
const TOKEN = 'Bearer YOUR_TMDB_BEARER_TOKEN_HERE';

// Validasi sederhana untuk memastikan placeholder telah diganti.
if (TOKEN.includes('YOUR_TMDB_BEARER_TOKEN_HERE')) {
    const errorMessage = "Error: TMDb Bearer Token not set in api/tmdb.ts. Please replace the placeholder value.";
    console.error(errorMessage);
    // Melempar error agar masalah langsung terlihat saat development.
    throw new Error(errorMessage);
}


const API_BASE_URL = 'https://api.themoviedb.org/3';
export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Membuat instance axios dengan konfigurasi default untuk semua request
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': TOKEN,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// --- INTERFACE UNTUK RESPON API TMDb ---
interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
}

interface Genre {
  id: number;
  name: string;
}

interface GetMoviesResponse {
  results: TmdbMovie[];
}

interface GetGenresResponse {
  genres: Genre[];
}


// --- FUNGSI-FUNGSI API ---

// Cache untuk daftar genre agar tidak di-fetch berulang kali
let genreMap: Map<number, string> | null = null;

export const getGenreMap = async (): Promise<Map<number, string>> => {
    if (genreMap) return genreMap;
    try {
        const response = await apiClient.get<GetGenresResponse>('/genre/movie/list');
        const genres = response.data.genres;
        const newGenreMap = new Map<number, string>();
        genres.forEach(genre => newGenreMap.set(genre.id, genre.name));
        genreMap = newGenreMap;
        return newGenreMap;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return new Map<number, string>();
    }
};

export const getGenres = async (): Promise<Genre[]> => {
    try {
        const response = await apiClient.get<GetGenresResponse>('/genre/movie/list');
        return response.data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
};

const mapTmdbMovieToMovie = (tmdbMovie: TmdbMovie, genres: Map<number, string>): Movie => {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    posterUrl: tmdbMovie.poster_path ? `${BASE_IMAGE_URL}${tmdbMovie.poster_path}` : 'https://via.placeholder.com/500x750.png?text=No+Image',
    description: tmdbMovie.overview,
    genre: tmdbMovie.genre_ids.map(id => genres.get(id) || 'Unknown').filter(g => g !== 'Unknown'),
    releaseYear: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 0,
    rating: tmdbMovie.vote_average,
    streamingSources: [],
  };
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const genres = await getGenreMap();
    const response = await apiClient.get<GetMoviesResponse>('/movie/popular');
    return response.data.results.map(movie => mapTmdbMovieToMovie(movie, genres));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw new Error('Gagal mengambil film populer.');
  }
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const genres = await getGenreMap();
    const response = await apiClient.get<GetMoviesResponse>('/movie/top_rated');
    return response.data.results.map(movie => mapTmdbMovieToMovie(movie, genres));
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw new Error('Gagal mengambil film rating tertinggi.');
  }
};


export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const genres = await getGenreMap();
    const response = await apiClient.get<GetMoviesResponse>('/discover/movie', {
      params: { with_genres: genreId, sort_by: 'popularity.desc' },
    });
    return response.data.results.map(movie => mapTmdbMovieToMovie(movie, genres));
  } catch (error) {
    console.error(`Error fetching movies for genre ID ${genreId}:`, error);
    throw new Error('Gagal mengambil film berdasarkan genre.');
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const genres = await getGenreMap();
    const response = await apiClient.get<GetMoviesResponse>('/search/movie', {
      params: { query },
    });
    return response.data.results.map(movie => mapTmdbMovieToMovie(movie, genres));
  } catch (error) {
    console.error(`Error searching for movies with query "${query}":`, error);
    throw new Error('Gagal melakukan pencarian film.');
  }
};
