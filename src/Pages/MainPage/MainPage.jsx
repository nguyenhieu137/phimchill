import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ApiService from '../../Services/ApiServices';
import './mainpage.scss'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';
import { BsPlayFill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import PuffLoader from "react-spinners/PuffLoader";
function MainPage() {
    const [movies, setMovies] = useState([]);
    const [tabTitle, setTabTitle] = useState('');
    const [labelContent, setLabelContent] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [tabTotalPages, setTabTotalPages] = useState(1);
    const location = useLocation();
    const isInitialMount = useRef(true);
    const contentRef = useRef(null);
    const abortController = useRef(new AbortController());
    useEffect(() => {
        const fetchData = async () => {
        try {
            abortController.current.abort(); // Abort any ongoing request
            const controller = new AbortController();
            abortController.current = controller;

            let apiCall;
            switch (location.pathname) {
            case '/phim-le':
                apiCall = ApiService.getSingleMovies;
                setTabTitle('PHIM LẺ');
                setLabelContent('quality');
                break;
            case '/phim-bo':
                apiCall = ApiService.getSeiriesMovies;
                setTabTitle('PHIM BỘ');
                setLabelContent('episode_current');
                break;
            case '/phim-hoat-hinh':
                apiCall = ApiService.getCartoonMovies;
                setTabTitle('PHIM HOẠT HÌNH');
                setLabelContent('episode_current');
                break;
            case '/tv-shows':
                apiCall = ApiService.getTvShows;
                setTabTitle('TV SHOWS - CHƯƠNG TRÌNH TV');
                setLabelContent('episode_current');
                break;
            default:
                apiCall = ApiService.getSingleMovies;
                setTabTitle('PHIM LẺ');
                setLabelContent('quality');
            }

            // Gọi API để lấy dữ liệu từ trang tương ứng
            const data = await apiCall({ page: currentPage, limit: 15 }, { signal: controller.signal });
            setMovies(data.movies);
            setTabTotalPages(data.totalPages);
            if (isInitialMount.current) {
                isInitialMount.current = false;
            } else {
                setCurrentPage(prevPage => Math.min(prevPage, data.totalPages)); // Cập nhật currentPage dựa trên totalPages mới
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    fetchData();
    return () => {
        abortController.current.abort(); // Cleanup function to abort ongoing request when component unmounts or re-renders
    };
    }, [location.pathname,currentPage]);

    useEffect(() => {
        setCurrentPage(1); // Đặt currentPage về 1 khi chuyển tab
    }, [location.pathname]);

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi currentPage thay đổi
    }, [currentPage]);

    const renderLabel = (movie) => {
        if (location.pathname === '/phim-bo' || location.pathname === '/phim-hoat-hinh') {
            return <span className="label">{movie.episode_current} - {movie.lang}</span>;
        } else {
            return <span className="label">{movie.quality} - {movie.lang}</span>;
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
        setLoading(true)
        setTimeout(()=>{
        setLoading(false)
        }, 2000)
    };

    const handleNextPage = () => {
        if (currentPage < tabTotalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
        setLoading(true)
        setTimeout(()=>{
        setLoading(false)
        }, 2000)
    };

    useEffect(() => {
        setCurrentPage(1); // Đặt currentPage về 1 khi chuyển tab
    }, [location.pathname]);

    const minPagesToShow = 6;
    const halfMinPagesToShow = Math.floor(minPagesToShow / 2);
    const startPage = Math.max(1, Math.min(currentPage - halfMinPagesToShow, tabTotalPages - minPagesToShow + 1));
    const endPage = Math.min(startPage + minPagesToShow - 1, tabTotalPages);
    const pagesToShow = Math.min(minPagesToShow, tabTotalPages);
    
    // handle loading content
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
        setLoading(false)
        }, 5000)
    }, [])
  return (
    <div>
        <Navbar></Navbar>
        <div className="main-section">
            <div className="block">
                <div className="block-header">
                    <p>{tabTitle}</p>
                </div>
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
                    <div className="block-grid">
                        {movies.map((movie, index) => (
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
                                {renderLabel(movie)}
                                <BsPlayFill className="play-icon" />
                            </Link>
                        ))}
                    </div>
                }
            </div>

            <div className="pagination">
                <button className={`pagi-btn ${currentPage === 1 ? 'hidden' : ''}`} onClick={handlePreviousPage}><FaArrowLeft /></button>
                {Array.from({ length: pagesToShow }, (_, i) => startPage + i).map((page) => (
                    <button className={`pagi-btn ${currentPage === page ? 'active' : ''}`} key={page} onClick={() => {
                        setCurrentPage(page); 
                        setLoading(true);
                        setTimeout(()=>{
                        setLoading(false)
                        }, 5000)
                    }}>{page}</button>
                ))}
                <button className={`pagi-btn ${currentPage === tabTotalPages ? 'hidden' : ''}`} onClick={handleNextPage}><FaArrowRight /></button>
            </div>
        </div>
        <Footer></Footer>       
    </div>
  )
}

export default MainPage