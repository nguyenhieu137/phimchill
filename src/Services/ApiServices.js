import axios from "axios";


const ApiService = {

    // Lấy data phim lẻ
    getSingleMovies: async ({ page, limit }) => {
        try {
            const response = await axios.get(
                `https://phimapi.com/v1/api/danh-sach/phim-le?page=${page}&limit=${limit}`
            );
            const totalPages = response.data.data.params.pagination.totalPages;
            const movies = response.data.data.items.map((movie) => ({
              ...movie,
              thumb_url: `https://img.phimapi.com/${movie.thumb_url}`,
            }));
            return { movies, totalPages };
        } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
        }
    },


    // Lấy data phim bộ
    getSeiriesMovies: async ({ page, limit }) => {
        try {
            const response = await axios.get(
                `https://phimapi.com/v1/api/danh-sach/phim-bo?page=${page}&limit=${limit}`
            );
            const totalPages = response.data.data.params.pagination.totalPages;
            const movies = response.data.data.items.map((movie) => ({
              ...movie,
              thumb_url: `https://img.phimapi.com/${movie.thumb_url}`,
            }));
            return { movies, totalPages };
        } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
        }
    },

    // Lấy data phim hoạt hình
    getCartoonMovies: async ({ page, limit }) => {
        try {
            const response = await axios.get(
                `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${page}&limit=${limit}`
            );
            const totalPages = response.data.data.params.pagination.totalPages;
            const movies = response.data.data.items.map((movie) => ({
                ...movie,
                thumb_url: `https://img.phimapi.com/${movie.thumb_url}`,
            }));
            return { movies, totalPages };
        } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
        }
    },

    // Lấy data tv shows
    getTvShows: async ({ page, limit }) => {
        try {
            const response = await axios.get(
                `https://phimapi.com/v1/api/danh-sach/tv-shows?page=${page}&limit=${limit}`
            );
            const totalPages = response.data.data.params.pagination.totalPages;
            const movies = response.data.data.items.map((movie) => ({
                ...movie,
                thumb_url: `https://img.phimapi.com/${movie.thumb_url}`,
            }));
            return { movies, totalPages };
        } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
        }
    },


    // Lấy thông tin chi tiết của một bộ phim bằng slug
    getMovieInfo: async (slug) => {
        try {
            const response = await axios.get(`https://phimapi.com/phim/${slug}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movie details:", error);
            throw error;
        }
    },

    getMoviebyCategory: async ({slug, page, limit}) => {
        try {
            const response = await axios.get(
                `https://phimapi.com/v1/api/the-loai/${slug}?page=${page}&limit=${limit}`
            );
            const totalPages = response.data.data.params.pagination.totalPages;
            const titlePage = response.data.data.titlePage;
            const movies = response.data.data.items.map((movie) => ({
                ...movie,
                thumb_url: `https://img.phimapi.com/${movie.thumb_url}`,
            }));
            return { movies, totalPages, titlePage };
        } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
        }
    },

    getMoviebyNation: async ({slug, page, limit}) => {
        try {
            const response = await axios.get(
                `https://phimapi.com/v1/api/quoc-gia/${slug}?page=${page}&limit=${limit}`
            );
            const totalPages = response.data.data.params.pagination.totalPages;
            const titlePage = response.data.data.titlePage;
            const movies = response.data.data.items.map((movie) => ({
                ...movie,
                thumb_url: `https://img.phimapi.com/${movie.thumb_url}`,
            }));
            return { movies, totalPages, titlePage };
        } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
        }
    },

    getMoviebyKeyword: async ({keyword, limit}) => {
        try {
            const response = await axios.get(
              `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=${limit}`
            );
            const titlePage = response.data.data.titlePage;
            const movies = response.data.data.items.map((movie) => ({
                ...movie,
                thumb_url: `https://img.phimapi.com/${movie.thumb_url}`,
            }));
            return { movies, titlePage };
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    }
};




export default ApiService;