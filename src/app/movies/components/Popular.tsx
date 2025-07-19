import Carousel from '@/app/components/Carousel';
import HeaderText from '@/app/components/HeaderText';
import ListLoadingPlaceholder from '@/app/components/ListLoadingPlaceholder';
import React from 'react';
import MovieItem from './MovieItem';

interface PopularProps {
  isLoading: boolean;
  items: any[];
}
const Popular = ({ isLoading, items }: PopularProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col">
        <div className="md:grid grid-cols-5 gap-6 mt-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <ListLoadingPlaceholder key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <HeaderText
          color="text-zinc-400"
          text="Movies"
          size={null}
          weight={null}
        />
        <HeaderText
          size="text-5xl"
          weight="font-black"
          text="Popular"
          color="text-zinc-300"
        />
      </div>
      <div className="flex flex-row md:mt-10">
          <Carousel items={items} component={(data:any, index:number) => <MovieItem key={index} show={data} />}/>
        </div>
    </div>
  );
};

export default Popular;
