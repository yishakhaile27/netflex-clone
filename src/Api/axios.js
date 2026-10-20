import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

instance.interceptors.request.use((config) => {
    const requestUrl = config.url || '';
    const isAbsoluteUrl = /^https?:\/\//i.test(requestUrl);
    const isTmdbRequest = !isAbsoluteUrl ||
        requestUrl.startsWith('https://api.themoviedb.org/3/');

    if (!isTmdbRequest) {
        return config;
    }

    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    if (!apiKey) {
        return Promise.reject(
            new Error('Missing TMDB API key. Add REACT_APP_TMDB_API_KEY to your .env file.')
        );
    }

    if (
        !requestUrl.includes('api_key=')
    ) {
        config.params = {
            ...config.params,
            api_key: apiKey,
        };
    }

    return config;
});

export default instance;