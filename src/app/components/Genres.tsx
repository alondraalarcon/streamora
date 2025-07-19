import React from 'react';

interface GenresProps {
  genres: any[];
}
const Genres = ({ genres }: GenresProps) => {
  return (
    <div className="flex flex-row gap-2">
      {genres?.map((value: any) => (
        <div
          className="px-1 py-2 bg-zinc-300 text-zinc-950 text-xs rounded w-32 text-center"
          key={value.id}
        >
          {value.name}
        </div>
      ))}
    </div>
  );
};

export default Genres;
