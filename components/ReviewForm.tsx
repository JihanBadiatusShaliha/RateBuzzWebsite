import React, { useState } from 'react';
import { Review } from '../types';

interface ReviewFormProps {
  // Fix: Changed the type to Pick<Review, 'comment' | 'rating'> to accurately reflect the data being submitted by the form.
  // The form component only collects a comment and a rating, and this more specific type resolves the error
  // where the onSubmit call was missing other properties from the full Review type.
  onSubmit: (review: Pick<Review, 'comment' | 'rating'>) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && rating > 0) {
      onSubmit({ comment, rating });
      setComment('');
      setRating(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-6 bg-slate-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
      <div className="mb-4">
        <label className="block text-slate-400 mb-2">Your Rating</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <svg
                className={`w-6 h-6 transition-colors duration-150 ${
                  (hoverRating || rating) >= star ? 'text-indigo-500' : 'text-slate-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-slate-400 mb-2">Your Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          rows={4}
          placeholder="What did you think of the movie?"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={!comment.trim() || rating === 0}
        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;