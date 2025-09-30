import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewListProps {
  reviews: Review[];
  title?: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, title = "User Reviews" }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      {reviews.length === 0 ? (
        <p className="text-slate-400">No reviews yet. Be the first to leave one!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-lg">{review.author}</p>
                <StarRating rating={review.rating} totalStars={10} size="sm" />
              </div>
              <p className="text-slate-300">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;