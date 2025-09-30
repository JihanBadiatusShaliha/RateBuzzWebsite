import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating';

const AccountInfoPage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  // Sort reviews from highest to lowest rating
  const sortedReviews = [...currentUser.reviews].sort((a, b) => b.rating - a.rating);

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img
          src={currentUser.profilePictureUrl}
          alt={currentUser.username}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-700 flex-shrink-0"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">{currentUser.username}</h1>
          <p className="text-slate-400 text-lg mt-1">{currentUser.email}</p>
          {currentUser.description && (
             <p className="text-slate-300 mt-4 text-lg italic">"{currentUser.description}"</p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Your Rated Films</h2>
        {sortedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedReviews.map(review => (
              <div key={review.id} className="bg-slate-800 rounded-lg p-4 flex gap-4 items-start">
                <Link to={`/movie/${review.movieId}`} className="flex-shrink-0">
                  <img src={review.moviePosterUrl} alt={review.movieTitle} className="w-24 h-36 object-cover rounded-md" />
                </Link>
                <div className="flex-grow">
                  <Link to={`/movie/${review.movieId}`} className="hover:underline">
                    <h3 className="text-xl font-bold">{review.movieTitle}</h3>
                  </Link>
                  <div className="my-2">
                    <StarRating rating={review.rating} totalStars={10} size="sm" />
                  </div>
                  <p className="text-slate-300 text-sm italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-slate-700 rounded-lg">
            <p className="text-slate-400">You haven't reviewed any movies yet.</p>
            <Link to="/" className="mt-4 inline-block text-indigo-400 hover:underline">
              Find a movie to review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInfoPage;