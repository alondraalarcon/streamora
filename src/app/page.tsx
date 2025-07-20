'use client';

import React, { useEffect, useState } from 'react';
import { withErrorHandling } from './helpers/errorHandling';
import { fetchTopRatedShows as fetchTopRatedMovieShows } from './services/moviesServices';
import { fetchTopRatedShows as fetchTopRatedTVShows } from './services/tvShowServices';
import { motion } from 'motion/react';
import HeaderText from './components/HeaderText';
import Rating from './components/Rating';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Show } from './types';

export default function HomePage() {
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  const [topRatedTVShows, setTopRatedTVShows] = useState([]);
  const [topRatedMovie, setTopRatedMovie] =useState<Show | null>(null);
  const [topRatedMovieShows, setTopRatedMovieShows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [topRatedTVShow, topRatedMovieShow] = await Promise.all([
        getTopRatedTVShows(),
        getTopRatedMovieShows(),
      ]);

      setTopRatedTVShows(topRatedTVShow);
      setTopRatedMovieShows(topRatedMovieShow);
      setTopRatedMovie(topRatedMovieShow[0] || null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const getTopRatedMovieShows = async () => {
    return withErrorHandling(async () => {
      const data = await fetchTopRatedMovieShows(1);
      return data.results;
    }, 'Failed to load top rated movie shows');
  };

  const getTopRatedTVShows = async () => {
    return withErrorHandling(async () => {
      const data = await fetchTopRatedTVShows(1);
      return data.results;
    }, 'Failed to load top rated tv shows');
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex mb-5 relative">
        <img
          src={`${TMDB_IMAGE_URL}original/${topRatedMovie?.backdrop_path}`}
          className="w-full min-h-screen md:h-screen object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="flex flex-col absolute w-full md:w-1/2 top-[200px] px-10 md:px-15 z-20 gap-5">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <HeaderText
              size="text-5xl md:text-7xl"
              weight="font-black"
              text={topRatedMovie?.name ?? topRatedMovie?.original_title}
              color="text-zinc-300"
            />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <Rating rating={topRatedMovie?.vote_average} />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <span className="md:text-base/7 text-sm/5 font-light">
              {topRatedMovie?.overview}
            </span>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col gap-10 p-10">
        <Swiper
          navigation={true}
          spaceBetween={20}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {topRatedMovieShows.map((item: any) => (
            <SwiperSlide key={item.id}>
              <motion.div
                whileHover={{
                  scale: 0.9,
                  transition: { duration: 1 },
                }}
                key={item.id}
              >
                <div>
                  {item.name}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
