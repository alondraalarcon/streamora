'use client';
import React, { useEffect, useState } from 'react';
import {
  fetchTvShow,
  fetchTvShowReviews,
  fetchSimilarTvShows,
} from '@/app/services/tvShowServices';
import { useParams } from 'next/navigation';
import ItemLoadingPlaceholder from '../../../components/ItemLoadingPlaceholder';
import { fetchVideoUrl } from '../../../services/videos';
import { Dot } from 'lucide-react';
import SimilarVideos from '@/app/components/SimilarVideos';
import Reviews from '@/app/components/Reviews';
import Videos from '@/app/components/Videos';
import HeaderText from '@/app/components/HeaderText';
import Genres from '@/app/components/Genres';
import TvShowItem from '../../components/TvShowItem';
import { withErrorHandling } from '@/app/helpers/errorHandling';

interface TvShow {
  show: any;
}
const TvPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [show, setTvShow] = useState<TvShow | null>(null);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  useEffect(() => {
    if (!id) return;

    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [tvShowData, reviewData, videoData, similarData] =
        await Promise.all([
          fetchTvShowRecord(id),
          fetchTvRecordReviews(id),
          fetchTvShowYoutubeVideos(id),
          fetchSimilarVideos(id),
        ]);

      setTvShow(tvShowData);
      setReviews(reviewData);
      setVideos(videoData);
      setSimilarVideos(similarData);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTvShowRecord = async (id: number) => {
    return withErrorHandling(async () => {
      const data = await fetchTvShow(id);
      return data;
    }, 'Failed to load tv show record');
  };

  const fetchTvRecordReviews = async (id: number) => {
    return withErrorHandling(async () => {
      const data = await fetchTvShowReviews(id);
      return data.results;
    }, 'Failed to load tv reviews.');
  };

  const fetchTvShowYoutubeVideos = async (id: number) => {
    return withErrorHandling(async () => {
      const data = await fetchVideoUrl(id, 'tv');
      return data.results.filter((video: any) => video.site === 'YouTube');
    }, 'Failed to load tv reviews.');
  };

  const fetchSimilarVideos = async (id: number) => {
    return withErrorHandling(async () => {
      const data = await fetchSimilarTvShows(id);
      return data.results;
    }, 'Failed to load tv reviews.');
  };
  if (isLoading) {
    return <ItemLoadingPlaceholder />;
  }

  if (error) return <p>Error: {error}</p>;
  return (
    <div className="bg-neutral-950 h-[100%] pb-10">
      <div className="flex flex-col">
        <div className="flex relative">
          <img
            src={`${TMDB_IMAGE_URL}original/${show?.backdrop_path}`}
            className="w-full h-[500px] object-cover object-center"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-100" />
        </div>
        <div className="flex flex-col pl-20">
          <div className="flex flex-row gap-10 -mt-62 z-20">
            <img
              src={`${TMDB_IMAGE_URL}original/${show?.poster_path}`}
              className="w-72 h-92 object-cover object-center rounded-2xl"
            />
            <div className="flex flex-col gap-2 mt-8">
              <HeaderText
                size="text-7xl"
                weight="font-black"
                text={show?.name}
                color="text-zinc-300"
              />
              <div className="flex flex-row gap-1">
                <span className="text-sm font-light">
                  {show?.first_air_date.substring(0, 4)}
                </span>
                <span>
                  <Dot size={20} />
                </span>
                <span className="text-sm font-light">
                  {show?.number_of_episodes} Episodes
                </span>
              </div>
              <Genres genres={show?.genres} />
              <span className="text-sm/7 font-light w-4/6">
                {show?.overview}
              </span>
            </div>
          </div>
          <div className="flex flex-col pr-10 gap-15 mt-20">
            {videos.length > 0 && (
              <div className="flex flex-col gap-2 bg-neutral-950">
                <HeaderText
                  size="text-4xl"
                  text="Videos"
                  weight="font-black"
                  color="text-zinc-300"
                />
                <Videos videos={videos} />
              </div>
            )}

            {reviews.length > 0 && (
              <div className="flex flex-col gap-2 bg-neutral-950">
                <HeaderText
                  size="text-4xl"
                  text="Reviews"
                  weight="font-black"
                 color="text-zinc-300"
                />
                <Reviews reviews={reviews} />
              </div>
            )}

            {similarVideos.length > 0 && (
              <div className="flex flex-col">
                <HeaderText
                  size="text-4xl"
                  text="Recommended Videos"
                  weight="font-black"
                  color="text-zinc-300"
                />
                <SimilarVideos
                  videos={similarVideos}
                  isLoading={isLoading}
                  component={(data: any, index: number) => (
                    <TvShowItem key={index} show={data} />
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvPage;
