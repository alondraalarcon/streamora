import Button from '@/app/components/Button';
import HeaderText from '@/app/components/HeaderText';
import Rating from '@/app/components/Rating';
import React from 'react';
import { motion } from 'motion/react';

interface showProps {
  show: any;
  isLoading: boolean;
  url: string;
}
const TopRatedShow = ({ show, isLoading, url }: showProps) => {
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  if (isLoading) {
    return (
      <div className="flex mb-5 relative">
        <div className="w-full h-screen object-cover object-center bg-zinc-800 animate-pulse" />
        <div className="flex flex-col absolute w-1/2 top-[200px] px-15 z-20 gap-5">
          <div className="bg-zinc-800 h-10 w-full rounded animate-pulse" />
          <div className="bg-zinc-800 h-10 w-20 rounded animate-pulse" />
          <div className="bg-zinc-800 h-20 w-72 rounded animate-pulse" />
          <div className="bg-zinc-800 h-10 w-48 rounded animate-pulse" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex mb-5 relative">
      <img
        src={`${TMDB_IMAGE_URL}original/${show?.backdrop_path}`}
        className="w-full min-h-screen md:h-screen object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="flex flex-col absolute w-full md:w-1/2 top-[200px] px-10 md:px-15 z-20 gap-5">
        <motion.div
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration:2, ease: 'easeOut' }}
        >
          <HeaderText
            size="text-5xl md:text-7xl"
            weight="font-black"
            text={show?.name ?? show?.original_title}
            color="text-zinc-300"
          />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration:2, ease: 'easeOut' }}
        >
          <Rating rating={show?.vote_average} />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration:2, ease: 'easeOut' }}
        >
          <span className="md:text-base/7 text-sm/5 font-light">{show.overview}</span>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration:2, ease: 'easeOut' }}
        >
          <Button
            text="Play"
            backgroundColor="bg-zinc-300"
            color="text-zinc-950"
            hoverBackgroundColor="bg-zinc-500"
            url={url + `${show?.id}`}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default TopRatedShow;
