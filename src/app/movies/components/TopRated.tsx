'use client';

import ListLoadingPlaceholder from '../../components/ListLoadingPlaceholder';
import MovieItem from './MovieItem';
import Carousel from '@/app/components/Carousel';
import HeaderText from '@/app/components/HeaderText';
import { motion } from 'motion/react';
import Link from 'next/link';

interface TopRatedProps {
    isLoading: boolean;
    items: any[];
  }

const TopRated = ({isLoading, items}: TopRatedProps) => {
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
              text="Movies"
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
              items={items}
              component={(data: any, index: number) => (
                <MovieItem key={index} show={data} />
              )}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TopRated;
