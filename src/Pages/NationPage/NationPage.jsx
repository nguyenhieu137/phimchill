import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ApiService from '../../Services/ApiServices';
import "./nationpage.scss";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { BsPlayFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PuffLoader from "react-spinners/PuffLoader";

function NationPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [titlePage, setTitlePage] = useState('');
  const { slug } = useParams();
  const location = useLocation();

  const fetchMoviesByNation = async () => {
    try {
      const { movies, totalPages, titlePage } = await ApiService.getMoviebyNation({ slug, page: currentPage, limit: 30 });
      setMovies(movies);
      setTotalPages(totalPages);
      setTitlePage(titlePage);
    } catch (error) {
      console.error('Error fetching movies by category:', error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname]);

  useEffect(() => {
    fetchMoviesByNation();
  }, [currentPage, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderLabel = (movie) => {
    if (movie.type === 'series' || movie.type === 'hoathinh') {
      return <span className="label">{movie.episode_current} - {movie.lang}</span>;
    } else {
      return <span className="label">{movie.quality} - {movie.lang}</span>;
    }
  };

  const minPagesToShow = 6;
  const halfMinPagesToShow = Math.floor(minPagesToShow / 2);
  const startPage = Math.max(1, Math.min(currentPage - halfMinPagesToShow, totalPages - minPagesToShow + 1));
  const endPage = Math.min(startPage + minPagesToShow - 1, totalPages);
  const pagesToShow = Math.min(minPagesToShow, totalPages);
  return (
    <div>
      <Navbar />
      <div className="main-section">
        <div className="block">
          <div className="block-header">
            <p>Danh sách các phim {titlePage}</p>
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
          ) : (
            <div className="block-grid">
              {movies.map((movie, index) => (
                <Link to={`/movie-info/${movie.slug}`} className={`item ${index === 0 ? 'first' : ''}`} key={index} title={movie.name}>
                  <img
                    src={movie.thumb_url}
                    alt={movie.name}
                    srcSet={`${movie.thumb_url} 1920w, ${movie.thumb_url} 1024w, ${movie.thumb_url} 768w`}
                        sizes=" 
                                (max-width: 1920px) 10%,
                                (max-width: 1024px) 20%,
                                (max-width: 768px) 10%, 30,3%
                            "
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

        <div className="pagination">
          <button className={`pagi-btn ${currentPage === 1 ? 'hidden' : ''}`} onClick={handlePreviousPage}><FaArrowLeft /></button>
          {Array.from({ length: pagesToShow }, (_, i) => startPage + i).map((page) => (
            <button className={`pagi-btn ${currentPage === page ? 'active' : ''}`} key={page} onClick={() => {
                  setCurrentPage(page); 
                  setLoading(true);
                  setTimeout(()=>{
                  setLoading(false)
                  }, 5000)
              }}>{page}
            </button>
          ))}
          <button className={`pagi-btn ${currentPage === totalPages ? 'hidden' : ''}`} onClick={handleNextPage}><FaArrowRight /></button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NationPage