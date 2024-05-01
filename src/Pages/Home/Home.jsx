import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './home.scss'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';
import MovieSlider from '../../Components/MovieSlider/MovieSlider'
import ApiService from '../../Services/ApiServices';
import { BsPlayFill } from "react-icons/bs";
import { MdArrowRight } from "react-icons/md";
import PuffLoader from "react-spinners/PuffLoader";
function Home() {
    const [singleMovies, setSingleMovies] = useState([]);
    const [seriesMovies, setSeriesMovies] = useState([]);
    const [cartoonMovies, setCartoonMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    useEffect(() => {
        const fetchSingleMovies = async () => {
            try {
                // const data = await ApiService.getSingleMovies({ page: 1, limit: 12 });
                const data = await ApiService.getSingleMovies({ page: 4, limit: 12 });
                setSingleMovies(data.movies);
            } catch (error) {
                console.error('Error fetching single movies:', error);
            }
        };

        const fetchSeriesMovies = async () => {
            try {
                const data = await ApiService.getSeiriesMovies({ page: 1, limit: 12 });
                setSeriesMovies(data.movies);
            } catch (error) {
                console.error('Error fetching series movies:', error);
            }
        };

        const fetchCartoonMovies = async () => {
            try {
                const data = await ApiService.getCartoonMovies({ page: 1, limit: 12 });
                setCartoonMovies(data.movies);
            } catch (error) {
                console.error('Error fetching series movies:', error);
            }
        };

        const fetchTvShows = async () => {
            try {
                const data = await ApiService.getTvShows({ page: 1, limit: 12 });
                setTvShows(data.movies);
            } catch (error) {
                console.error('Error fetching series movies:', error);
            }
        };

        fetchSingleMovies();
        fetchSeriesMovies();
        fetchCartoonMovies();
        fetchTvShows();
    }, []);

    // handle loading content
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
        setLoading(false)
        }, 1000)
    }, [])
  return (
    <div>
        <Navbar></Navbar>
        <MovieSlider></MovieSlider>
        {
            loading?
            <div className="loading-container">
                <PuffLoader
                color={'#FF8B1F'}
                loading={loading}
                size={100}
                />
                <span>Vui lòng tải lại trang nếu có lỗi - PhimChill chúc bạn xem phim vui vẻ</span>
            </div>
            :
            <div className='home-section'>
                {singleMovies && singleMovies.length > 0 && (
                    <div className="block">
                        <div className="block-header">
                            <p>PHIM LẺ MỚI</p>
                            <Link to = '/phim-le' className='view-all'>Xem tất cả <MdArrowRight className='icon-al'></MdArrowRight></Link>
                        </div>
                        
                        <div className="block-grid">
                            {singleMovies.map((movie, index) => (
                                <Link to={`/movie-info/${movie.slug}`} className={`item ${index === 0 ? 'first' : ''}`} key={index} title={movie.name}>
                                    <img 
                                        srcSet={`${movie.thumb_url} 1920w, ${movie.thumb_url} 1024w, ${movie.thumb_url} 768w`}
                                            sizes=" 
                                                    (max-width: 1920px) 10%,
                                                    (max-width: 1024px) 20%,
                                                    (max-width: 768px) 10%, 30,3%
                                                "
                                        src={movie.thumb_url}
                                        alt={movie.name}
                                    />
                                    <div className="movie-name">
                                        <span>{movie.name} - {movie.origin_name}</span>
                                    </div>
                                    <span className="label">{movie.quality} - {movie.lang}</span>
                                    <BsPlayFill className="play-icon" />
                                </Link>
                            ))}
                        </div>
                        
                    </div>
                )}


                {seriesMovies && seriesMovies.length > 0 && (
                    <div className="block">
                        <div className="block-header">
                            <p>PHIM BỘ MỚI</p>
                            <Link to ='/phim-bo' className='view-all'>Xem tất cả <MdArrowRight className='icon-al'></MdArrowRight></Link>
                        </div>
                        
                        <div className="block-grid">
                            {seriesMovies.map((movie, index) => (
                                <Link to={`/movie-info/${movie.slug}`} className={`item ${index === 0 ? 'first' : ''}`} key={index} title={movie.name}>
                                    <img 
                                        srcSet={`${movie.thumb_url} 1920w, ${movie.thumb_url} 1024w, ${movie.thumb_url} 768w`}
                                            sizes=" 
                                                    (max-width: 1920px) 10%,
                                                    (max-width: 1024px) 20%,
                                                    (max-width: 768px) 10%, 30,3%
                                                "
                                        src={movie.thumb_url}
                                        alt={movie.name}
                                    />
                                    <div className="movie-name">
                                        <span>{movie.name} - {movie.origin_name}</span>
                                    </div>
                                    <span className="label">{movie.episode_current}-{movie.lang}</span>
                                    <BsPlayFill className="play-icon" />
                                </Link>
                            ))}
                        </div>
                        
                    </div>
                )}


                {cartoonMovies && cartoonMovies.length > 0 && (
                    <div className="block">
                        <div className="block-header">
                            <p>PHIM HOẠT HÌNH</p>
                            <Link to = '/phim-hoat-hinh' className='view-all'>Xem tất cả <MdArrowRight className='icon-al'></MdArrowRight></Link>
                        </div>
                        
                        <div className="block-grid">
                            {cartoonMovies.map((movie, index) => (
                                <Link to={`/movie-info/${movie.slug}`} className={`item ${index === 0 ? 'first' : ''}`} key={index} title={movie.name}>
                                    <img 
                                        srcSet={`${movie.thumb_url} 1920w, ${movie.thumb_url} 1024w, ${movie.thumb_url} 768w`}
                                            sizes=" 
                                                    (max-width: 1920px) 10%,
                                                    (max-width: 1024px) 20%,
                                                    (max-width: 768px) 10%, 30,3%
                                                "
                                        src={movie.thumb_url}
                                        alt={movie.name}
                                    />
                                    <div className="movie-name">
                                        <span>{movie.name} - {movie.origin_name}</span>
                                    </div>
                                    <span className="label">{movie.episode_current}-{movie.lang}</span>
                                    <BsPlayFill className="play-icon" />
                                </Link>
                            ))}
                        </div>
                        
                    </div>
                )}

                {tvShows && tvShows.length > 0 && (
                    <div className="block">
                        <div className="block-header">
                            <p>TV SHOWS - CHƯƠNG TRÌNH TV</p>
                            <Link to = '/tv-shows' className='view-all'>Xem tất cả <MdArrowRight className='icon-al'></MdArrowRight></Link>
                        </div>
                        
                        <div className="block-grid">
                            {tvShows.map((movie, index) => (
                                <Link to={`/movie-info/${movie.slug}`} className={`item ${index === 0 ? 'first' : ''}`} key={index} title={movie.name}>
                                    <img 
                                        srcSet={`${movie.thumb_url} 1920w, ${movie.thumb_url} 1024w, ${movie.thumb_url} 768w`}
                                            sizes=" 
                                                    (max-width: 1920px) 10%,
                                                    (max-width: 1024px) 20%,
                                                    (max-width: 768px) 10%, 30,3%
                                                "
                                        src={movie.thumb_url}
                                        alt={movie.name}
                                    />
                                    <div className="movie-name">
                                        <span>{movie.name} - {movie.origin_name}</span>
                                    </div>
                                    <span className="label">{movie.episode_current}-{movie.lang}</span>
                                    <BsPlayFill className="play-icon" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        }
        <Footer></Footer>
    </div>
  )
}

export default Home