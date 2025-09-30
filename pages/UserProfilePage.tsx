import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_USERS } from '../constants/users';
import StarRating from '../components/StarRating';

const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const user = MOCK_USERS.find(u => u.username === username);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
        <Link to="/" className="text-indigo-500 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen">
      <Link to="/" className="absolute top-5 left-5 z-20 p-2 bg-black/50 rounded-full hover:bg-black/75 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
      </Link>
      
      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12 text-center">
        <img src={user.profilePictureUrl} alt={user.username} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-700" />
        <h1 className="text-4xl font-bold">{user.username}</h1>
        <p className="text-slate-400">{user.email}</p>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 pb-12">
        <h2 className="text-3xl font-bold mb-6">{user.username}'s Reviews</h2>
        {user.reviews.length > 0 ? (
          <div className="space-y-8">
            {user.reviews.map(review => (
              <div key={review.id} className="flex flex-col sm:flex-row gap-6 p-4 bg-slate-800 rounded-lg">
                <Link to={`/movie/${review.movieId}`} className="flex-shrink-0">
                  <img src={review.moviePosterUrl} alt={review.movieTitle} className="w-24 h-36 object-cover rounded-md" />
                </Link>
                <div className="flex-grow">
                  <Link to={`/movie/${review.movieId}`} className="hover:underline">
                    <h3 className="text-2xl font-bold">{review.movieTitle}</h3>
                  </Link>
                  <div className="my-2">
                    <StarRating rating={review.rating} totalStars={10} size="sm" />
                  </div>
                  <p className="text-slate-300 italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">This user hasn't reviewed any movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;