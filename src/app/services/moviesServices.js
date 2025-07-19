import { apiFetch } from '../lib/apiClient'

export function fetchMovieShows(page = 1)
{
    return apiFetch('movie/popular?page='+page);
}
export function fetchMovieShow(id)
{
    return apiFetch(`movie/${id}`);
}
export function fetchTopRatedShows(page)
{
    return apiFetch(`movie/top_rated?region=PH&language=en-US&page=${page}`)
}
export function fetchMovieReviews(id)
{
    return apiFetch(`movie/${id}/reviews`)
}
export function fetchSimilarMovieShow(id)
{
    return apiFetch(`movie/${id}/similar`);
}