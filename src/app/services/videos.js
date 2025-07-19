import { apiFetch } from "../lib/apiClient";

export function fetchVideoUrl(id, type)
{
    return apiFetch(`${type}/${id}/videos`);
}