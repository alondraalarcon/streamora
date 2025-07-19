'use client';

import React, { useEffect, useState } from 'react';
import { fetchSimilarTvShows } from '../../services/tvShowServices';
import ListLoadingPlaceholder from '../../components/ListLoadingPlaceholder';
import TvShowItem from './TvShowItem';
import Carousel from '@/app/components/Carousel';

interface SimilarVideosProps{ 
    id:number;
}
const SimilarVideos = ({id} : SimilarVideosProps) => {
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const data = await fetchSimilarTvShows(id);
      setTvShows(data.results);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch TV Shows');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="h-screen">
          <div className="md:grid grid-cols-5 gap-6 mt-10 pb-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <ListLoadingPlaceholder key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-row md:mt-10">
          <Carousel items={tvShows} component={(data:any, index:number) => <TvShowItem key={index} show={data} />}/>
        </div>
      )}
    </div>
  );
};

export default SimilarVideos;
