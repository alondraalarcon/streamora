import Link from 'next/link';
import React from 'react';
import Rating from '@/app/components/Rating';

interface MovieItemProps {
  show: any;
}
const MovieItem = ({ show }: MovieItemProps) => {
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  return (
    <Link
      href={`/movies/detail/${show?.id}`}
      className="flex flex-col h-auto min-h-80 text-white cursor-pointer"
    >
      <img
        src={`${TMDB_IMAGE_URL}original/${show?.poster_path}`}
        className="w-full h-72 min-h-80 object-cover rounded-3xl"
      />
      <div className="flex flex-col gap-1 py-2 w-full">
        <span className="capitalize text-sm">{show?.name}</span>
        <div className="flex flex-row justify-between">
          <span className="capitalize text-xs">{show?.first_air_date?.substring(0, 4)}</span>
          <Rating rating={show?.vote_average}/>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
