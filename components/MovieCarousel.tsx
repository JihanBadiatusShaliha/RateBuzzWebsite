

import React, { useRef, useState, useEffect } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Scroll ${direction}`}
    className={`absolute top-1/2 -translate-y-1/2 z-20 bg-slate-800/60 hover:bg-slate-800/90 p-2 rounded-full text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
      direction === 'left' ? 'left-2' : 'right-2'
    }`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {direction === 'left' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      )}
    </svg>
  </button>
);

// Fix: Defined the missing MovieCarouselProps interface.
// This interface declares the shape of the props object that the MovieCarousel component expects,
// resolving the "Cannot find name 'MovieCarouselProps'" error.
interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkArrowsVisibility = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const isScrolledToStart = el.scrollLeft <= 0;
      // Check if scrolled to the end (with a small tolerance for subpixel values)
      const isScrolledToEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      
      setShowLeftArrow(!isScrolledToStart);
      // Show right arrow only if there's content to scroll to
      setShowRightArrow(!isScrolledToEnd && el.scrollWidth > el.clientWidth);
    }
  };
  
  // This effect sets up event listeners to check arrow visibility on scroll and window resize
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    // Initial check when the component mounts or movies change
    checkArrowsVisibility();

    scrollContainer?.addEventListener('scroll', checkArrowsVisibility);
    window.addEventListener('resize', checkArrowsVisibility);

    return () => {
      scrollContainer?.removeEventListener('scroll', checkArrowsVisibility);
      window.removeEventListener('resize', checkArrowsVisibility);
    };
  }, [movies]); // Re-run if the list of movies changes

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      // Scroll by 80% of the visible width for a pleasant scrolling experience
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 px-4 sm:px-8 md:px-16">{title}</h2>
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 custom-scrollbar space-x-4 px-4 sm:px-8 md:px-16 scroll-smooth"
        >
          {movies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
          ))}
           <div className="flex-shrink-0 w-1 sm:w-4 md:w-12"></div> {/* Right padding */}
        </div>

        {/* Navigation Arrows are conditionally rendered based on state */}
        {showLeftArrow && <ArrowButton direction="left" onClick={() => handleScroll('left')} />}
        {showRightArrow && <ArrowButton direction="right" onClick={() => handleScroll('right')} />}
      </div>
    </div>
  );
};

export default MovieCarousel;