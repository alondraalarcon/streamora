import { apiFetch } from "../lib/apiClient";

export function fetchTvShows(page = 1)
{
    return apiFetch('tv/popular?page='+page);
}
export function fetchTvShow(id)
{
    return apiFetch(`tv/${id}`);
}
export function fetchTopRatedShows(page)
{
    return apiFetch(`tv/top_rated?region=PH&language=en-US&page=${page}`)
}
export function fetchTvShowReviews(id)
{
    return apiFetch(`tv/${id}/reviews`)
}
export function fetchSimilarTvShows(id)
{
    return apiFetch(`tv/${id}/similar`);
}