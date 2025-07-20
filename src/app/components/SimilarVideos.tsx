'use client';

import Carousel from '@/app/components/Carousel';
import ListLoadingPlaceholder from './ListLoadingPlaceholder';

interface SimilarVideosProps<T>{ 
    videos:any[];
    isLoading: boolean;
    component: (data: T, index: number) => React.ReactNode;
}

export default function SimilarVideos<T>({ videos, isLoading, component }: SimilarVideosProps<T>) {
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="h-screen">
          <div className="md:grid grid-cols-5 gap-6 mt-5 pb-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <ListLoadingPlaceholder key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-row md:mt-10">
          <Carousel items={videos} component={(data:any, index:number) => component(data, index)}/>
        </div>
      )}
    </div>
  );
};