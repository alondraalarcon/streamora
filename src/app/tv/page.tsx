'use client';
import React, { useEffect, useState } from 'react';
import { fetchTvShows, fetchTopRatedShows } from '../services/tvShowServices';
import Popular from './components/Popular';
import TopRated from '@/app/tv/components/TopRated';
import { withErrorHandling } from '../helpers/errorHandling';
import TopRatedShow from '../components/TopRatedShow';

const Page = () => {
  const [tvShows, setTvShows] = useState([]);
  const [topRatedShow, setTopRatedShow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [allShows, topRatedShows] = await Promise.all([
        fetchTvShowLists(),
        fetchTopRatedShowsLists(),
      ]);

      setTvShows(allShows);
      setTopRatedShow(topRatedShows);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch TV Shows');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTvShowLists = async () => {
    return withErrorHandling(async () => {
      const data = await fetchTvShows();
      return data;
    }, 'Failed to load TV Shows');
  };

  const fetchTopRatedShowsLists = async () => {
    return withErrorHandling(async () => {
      const data = await fetchTopRatedShows(1);
      return data.results[0];
    }, 'Failed to load top rated TV Shows');
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <TopRatedShow show={topRatedShow} isLoading={isLoading} url="/tv/detail/"/>
      <div className="flex flex-col gap-10 p-10">
        <TopRated />
        <Popular />
      </div>
    </div>
  );
};

export default Page;
