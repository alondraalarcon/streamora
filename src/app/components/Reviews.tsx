import { format } from 'date-fns';
import { User } from 'lucide-react';
import React, { useState } from 'react';

interface ReviewsProps {
  reviews?: any[];
}
const Reviews = ({ reviews }: ReviewsProps) => {
    const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);

  const toggleShowMore = (id:number) => {
    setExpandedReviewId(prevId => (prevId === id ? null : id));
  }
  return (
    <div className="flex flex-col gap-4  mt-5">
      {reviews?.map((value: any) => (
        <div className="bg-zinc-900 rounded-xl p-5" key={value.id}>
          <div className="flex flex-row gap-2">
            <img
              src="/assets/images/user-icon.png"
              className="rounded-full w-10 h-full"
            />
            <div className="flex flex-col">
              <span className="capitalize">{value.author}</span>
              <span className="text-xs">
                {format(new Date(value.created_at), 'PPPp')}
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="flex flex-col justify-start gap-2 text-sm/6">
            {expandedReviewId === value.id
                ? value.content
                : `${value.content.substring(0, 200)}...`}
              {value.content.length > 200 && (
                <button
                  onClick={() => toggleShowMore(value.id)}
                  className="text-zinc-300 cursor-pointer underline ml-2"
                >
                  {expandedReviewId === value.id ? 'Show Less' : 'Show More'}
                </button>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
