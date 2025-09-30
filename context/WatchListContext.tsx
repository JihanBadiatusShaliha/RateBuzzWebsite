import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Movie } from '../types';

interface WatchListContextType {
  watchList: Movie[];
  addToWatchList: (movie: Movie) => void;
  removeFromWatchList: (movieId: number) => void;
  isInWatchList: (movieId: number) => boolean;
}

const WatchListContext = createContext<WatchListContextType | undefined>(undefined);

export const WatchListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchList, setWatchList] = useState<Movie[]>(() => {
     try {
      const item = window.localStorage.getItem('watchList');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('watchList', JSON.stringify(watchList));
    } catch (error) {
        console.error('Error writing to localStorage', error);
    }
  }, [watchList]);

  const addToWatchList = (movie: Movie) => {
    setWatchList((prev) => {
      if (!prev.some(item => item.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromWatchList = (movieId: number) => {
    setWatchList(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWatchList = (movieId: number) => {
    return watchList.some(movie => movie.id === movieId);
  };
  
  return (
    <WatchListContext.Provider value={{ watchList, addToWatchList, removeFromWatchList, isInWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => {
  const context = useContext(WatchListContext);
  if (context === undefined) {
    throw new Error('useWatchList must be used within a WatchListProvider');
  }
  return context;
};