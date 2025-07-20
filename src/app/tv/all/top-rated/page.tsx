'use client';

import { fetchTopRatedShows } from '@/app/services/tvShowServices';
import { useEffect, useState } from 'react';
import TvShowItem from '../../components/TvShowItem';
import { motion } from 'framer-motion';
import HeaderText from '@/app/components/HeaderText';
import ListLoadingPlaceholder from '@/app/components/ListLoadingPlaceholder';
import Pagination from '@/app/components/Pagination';
import { Show } from '@/app/types';
const AllTopRated = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAll();
  }, [page]);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTopRatedShows(page);
      setShows(data.results);
      setTotalPages(data.results.length);
    } catch (err: any) {
      setError(err.message || 'Failed to load shows');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col p-3 md:p-10 gap-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <HeaderText
            color="text-zinc-400"
            text="TV Shows"
          />
          <HeaderText
            size="text-5xl"
            weight="font-black"
            text="Top Rated"
            color="text-zinc-300"
          />
        </div>
        <div className="flex flex-row justify-end mt-2">
          <Pagination page={page} handleNext={handleNext} handlePrev={handlePrev} totalPages={totalPages}/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 pb-10">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ListLoadingPlaceholder key={index} />
            ))
          : shows.map((value) => (
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 1 },
                }}
                key={value?.id}
              >
                <TvShowItem show={value} />
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default AllTopRated;
