import React, { useEffect, useState } from "react";
import { useSearch } from '../../SearchContext';
import { Link } from 'react-router-dom';
import './searchpage.scss';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { BsPlayFill } from "react-icons/bs";
import ApiService from '../../Services/ApiServices';
import PuffLoader from "react-spinners/PuffLoader";

function SearchPage() {
    const { searchKeyword } = useSearch();
    const [searchResult, setSearchResult] = useState([]);
    const [titlePage, setTitlePage] = useState('');
    const [showLoadButton, setShowLoadButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [visibleMovies, setVisibleMovies] = useState(15);

    const fetchMoviesByKeyword = async () => {
        setLoading(true);
        try {
            const { movies, titlePage } = await ApiService.getMoviebyKeyword({ keyword: searchKeyword, limit: visibleMovies });
            setSearchResult(movies);
            setTitlePage(titlePage);
            setLoading(false);
            setShowLoadButton(movies.length === visibleMovies);
            localStorage.setItem("searchKeyword", searchKeyword);
           
        } catch (error) {
            console.error('Error fetching movies by keyword:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMoviesByKeyword();
    }, [searchKeyword, visibleMovies]);

    const renderLabel = (movie) => {
        if (movie.type === 'series' || movie.type === 'hoathinh') {
            return <span className="label">{movie.episode_current} - {movie.lang}</span>;
        } else {
            return <span className="label">{movie.quality} - {movie.lang}</span>;
        }
    };

    const handleLoadMore = async () => {
        const newVisibleMovies = visibleMovies + 5;
        setVisibleMovies(newVisibleMovies);
    };

    return (
        <div>
            <Navbar />
            <div className="main-section">
                <div className="block">
                    <div className="block-header">
                        <p>{titlePage}</p>
                    </div>
                    {loading ? (
                        <div className="loading-container">
                            <PuffLoader
                                color={'#FF8B1F'}
                                loading={loading}
                                size={100}
                            />
                            <span>Vui lòng tải lại trang nếu có lỗi - PhimChill chúc bạn xem phim vui vẻ</span>
                        </div>
                    ) : searchResult.length === 0 ? (
                        <div className="no-movies-found">
                            <p>Không có phim {searchKeyword}, vui lòng tìm phim khác !</p>
                        </div>
                    ) : (
                        <div className="block-grid">
                            {searchResult.map((movie, index) => (

                                <Link to={`/movie-info/${movie.slug}`} className={`item ${index === 0 ? 'first' : ''}`} key={index} title={movie.name}>
                                    <img
                                        loading="lazy"
                                        src={movie.thumb_url}
                                        alt={movie.name}
                                        srcSet={`${movie.thumb_url} 1920w, ${movie.thumb_url} 1024w, ${movie.thumb_url} 768w`}
                                        sizes="(max-width: 1920px) 10%, (max-width: 1024px) 20%, (max-width: 768px) 10%, 30,3%"
                                    />
                                    
                                    
                                    <div className="movie-name">
                                        <span>{movie.name} - {movie.origin_name}</span>
                                    </div>
                                    {renderLabel(movie)}
                                    <BsPlayFill className="play-icon" />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                {showLoadButton && ( 
                    <button className="btn-load" onClick={handleLoadMore}>
                        Xem thêm
                    </button>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchPage;


