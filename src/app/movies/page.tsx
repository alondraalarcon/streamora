'use client'

import React, { useEffect, useState } from 'react';
import { fetchMovieShows, fetchTopRatedShows } from '@/app/services/moviesServices';
import { withErrorHandling } from '../helpers/errorHandling';
import Popular from './components/Popular';
import TopRatedShow from '@/app/components/TopRatedShow';
import TopRated from './components/TopRated';

const page = () => {
  const [movies, setMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [topRatedShow, setTopRatedShow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
        const [popularMovies, topRatedShow] = await Promise.all([
            getPopularMovies(),
            getTopRatedMovies()
        ]);

        setMovies(popularMovies);
        setTopRatedShows(topRatedShow);
        setTopRatedShow(topRatedShow[0]);
    } catch (err:any) {
        setError(err.message || 'Failed to load movies');
    } finally { 
        setIsLoading(false);
    }
  }

  const getPopularMovies = async () => {
   return withErrorHandling(async () => {
        const data = await fetchMovieShows(1);
        return data.results;
    }, 'Failed to load popular movies');
  }

  const getTopRatedMovies = async () => {
    return withErrorHandling(async () => {
        const data = await fetchTopRatedShows(1);
        return data.results;
    }, 'Failed to load top rated movies');
  }

  if(error) {
    return <div>{error}</div>
  }

  return (
    <>
        <TopRatedShow show={topRatedShow} isLoading={isLoading} url={`/movies/detail/${topRatedShow.id}`}/>
        <div className="flex flex-col gap-10 p-10">
            <Popular isLoading={isLoading} items={movies}/>
            <TopRated isLoading={isLoading} items={topRatedShows}/>
        </div>
    </>
  );
};

export default page;
