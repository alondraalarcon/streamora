'use client';

import React, { useEffect, useState } from 'react';
import { fetchTopRatedShows } from '../../services/tvShowServices';
import ListLoadingPlaceholder from '../../components/ListLoadingPlaceholder';
import TvShowItem from './TvShowItem';
import Carousel from '@/app/components/Carousel';
import HeaderText from '@/app/components/HeaderText';
import { motion } from 'motion/react';
import Link from 'next/link';

const TopRated = () => {
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const data = await fetchTopRatedShows(1);
      setTvShows(data.results);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch TV Shows');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-end mb-5">
          <div className="flex flex-col">
            <HeaderText
              color="text-zinc-400"
              text="TV Show"
            />
            <HeaderText
              size="text-4xl md:text-5xl"
              weight="font-black"
              text="Top Rated"
              color="text-zinc-300"
            />
          </div>
          <Link href="/tv/all/top-rated">
            <button className="bg-zinc-800 w-25 h-10 rounded cursor-pointer hover:animate-pulse">
              Show All
            </button>
          </Link>
        </div>
        {isLoading ? (
          <div className="md:grid grid-cols-5 gap-6 mt-10 pb-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <ListLoadingPlaceholder key={index} />
            ))}
          </div>
        ) : (
          <div className="flex md:flex-row md:mt-10">
            <Carousel
              items={tvShows}
              component={(data: any, index: number) => (
                <TvShowItem key={index} show={data} />
              )}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TopRated;
