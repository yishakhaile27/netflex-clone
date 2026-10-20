import instance from './axios';
import requests from './Requests';

jest.mock('axios', () => jest.requireActual('axios/dist/browser/axios.cjs'));

const originalApiKey = process.env.REACT_APP_TMDB_API_KEY;

afterEach(() => {
    if (originalApiKey === undefined) {
        delete process.env.REACT_APP_TMDB_API_KEY;
    } else {
        process.env.REACT_APP_TMDB_API_KEY = originalApiKey;
    }
});

const mockAdapter = (config) => Promise.resolve({
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
});

test('rejects TMDB requests when the API key is missing', async () => {
    delete process.env.REACT_APP_TMDB_API_KEY;

    await expect(instance.get('/movie/123')).rejects.toThrow(
        'Missing TMDB API key. Add REACT_APP_TMDB_API_KEY to your .env file.'
    );
});

test('adds the TMDB API key to requests that do not already have one', async () => {
    process.env.REACT_APP_TMDB_API_KEY = 'test-tmdb-key';

    const response = await instance.get('/movie/123', { adapter: mockAdapter });

    expect(response.config.params.api_key).toBe('test-tmdb-key');
});

test('adds the TMDB API key to shared movie endpoints', async () => {
    process.env.REACT_APP_TMDB_API_KEY = 'test-tmdb-key';

    const response = await instance.get(requests.fetchAllMovies, { adapter: mockAdapter });

    expect(response.config.params.api_key).toBe('test-tmdb-key');
    expect(response.config.url).toBe('/movie/popular?language=en-US');
});

test('does not attach the TMDB API key to external API requests', async () => {
    process.env.REACT_APP_TMDB_API_KEY = 'test-tmdb-key';

    const response = await instance.get('https://www.omdbapi.com/', {
        params: { apikey: 'test-omdb-key' },
        adapter: mockAdapter,
    });

    expect(response.config.params).toEqual({ apikey: 'test-omdb-key' });
});
