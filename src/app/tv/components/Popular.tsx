'use client';

import React, { useEffect, useState } from 'react';
import { fetchTvShows } from '../../services/tvShowServices';
import { motion } from 'motion/react';
import ListLoadingPlaceholder from '../../components/ListLoadingPlaceholder';
import TvShowItem from './TvShowItem';
import Carousel from '@/app/components/Carousel';
import HeaderText from '@/app/components/HeaderText';
import Link from 'next/link';

const Popular = () => {
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  useEffect(() => {
    fetchTvShowLists();
  }, []);

  const fetchTvShowLists = async () => {
    try {
      const data = await fetchTvShows();
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
      <div className="flex flex-col h-auto">
        <div className="flex flex-row justify-between items-center mb-5 md:mb-0">
          <div className="flex flex-col">
            <HeaderText
              color="text-zinc-400"
              text="TV Show"
            />
            <HeaderText
              size="text-4xl md:text-5xl"
              weight="font-black"
              text="Popular"
              color="text-zinc-300"
            />
          </div>
          <Link href="/tv/all/popular">
            <button className="bg-zinc-800 w-25 h-10 rounded cursor-pointer hover:animate-pulse">
              Show All
            </button>
          </Link>
        </div>
        {isLoading ? (
          <div className="md:grid grid-cols-5 gap-6 mt-10">
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

export default Popular;
