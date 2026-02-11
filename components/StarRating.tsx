
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="transition-transform active:scale-90"
        >
          <Star
            size={32}
            className={`${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
