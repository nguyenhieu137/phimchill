import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './moviedetails.scss'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';
import ApiService from '../../Services/ApiServices';
import { BsPlayFill } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import PuffLoader from "react-spinners/PuffLoader";
import { FacebookProvider, Comments } from 'react-facebook';
function MovieDetails() {
    const { slug } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const data = await ApiService.getMovieInfo(slug);
                setMovieDetail(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetail();
    }, [slug]);
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
        setLoading(false)
        }, 1000)
    }, [])

     const handleEpisodeSelect = (episode) => {
        // Save selected episode to localStorage
        localStorage.setItem('selectedEpisode', JSON.stringify(episode));
        navigate(`/watch-movie/${slug}`);
    };

    const handleRemoveEpisodes = () => {
        localStorage.removeItem("selectedEpisode")
    }
    return (
        <div>
            <Navbar></Navbar>
            {
                loading?
                <div className="loading-container__moviedt">
                    <PuffLoader
                    color={'#FF8B1F'}
                    loading={loading}
                    size={100}
                    />
                    <span>Vui lòng tải lại trang nếu có lỗi - PhimChill chúc bạn xem phim vui vẻ</span>
                </div>
                :
                <div className="movie-info__section">
                    {movieDetail && (
                        <div className="movie-info__container">

                            <div className="movie-info__banner">
                                <div className="movie-banner__img">
                                    <img src={movieDetail.movie.thumb_url} alt="" />
                                    <div className='movie-banner__action'>
                                        <span className='mv-oname'>{movieDetail.movie.origin_name}</span>
                                        <span className='mv-name'>{movieDetail.movie.name} ({movieDetail.movie.year})</span>
                                        <div className="banner-btn">
                                            {movieDetail && movieDetail.movie.trailer_url.trim() !== "" && (
                                                <a href={movieDetail.movie.trailer_url} target="_blank" rel="noopener noreferrer" className='trailer-btn'>
                                                    <FaYoutube className='yt-ic'></FaYoutube>
                                                    Trailer
                                                </a>
                                            )}
                                            <Link to={`/watch-movie/${movieDetail.movie.slug}`} onClick={handleRemoveEpisodes} className='watch-btn'><HiOutlinePlayCircle className='play-ic'></HiOutlinePlayCircle>Xem phim</Link>
                                        </div>
                                    </div> 
                                    <Link to={`/watch-movie/${movieDetail.movie.slug}`} onClick={handleRemoveEpisodes}><BsPlayFill className="play-icon" /></Link>
                                    {/* <BsPlayFill className="play-icon" /> */}
                                </div>
                            </div>

                            {movieDetail && (movieDetail.movie.type === "series" || movieDetail.movie.type === "hoathinh") && (
                                <div className="newest-ep">
                                    <span>Tập mới:</span>
                                    {/* Hiển thị các tập mới nhất */}
                                    {movieDetail.episodes && movieDetail.episodes.length > 0 && movieDetail.episodes[0].server_data
                                        ? movieDetail.episodes[0].server_data
                                            .sort((a, b) => new Date(b.created) - new Date(a.created))
                                            .slice(-3)
                                            .map((episode, index) => (
                                                <button
                                                    className='ep-item'
                                                    key={episode.slug}
                                                    onClick={() => handleEpisodeSelect(episode)}
                                    
                                                >
                                                    {episode.name}
                                                </button>
                                            ))
                                        : <p>Không có tập mới.</p>
                                    }
                                </div>
                            )}
                            
                            <div className="movie-info__text">
                                <div className="movie-text__item">
                                    <div className='info-item'>
                                        <span className='if-name'>Trạng thái:</span>
                                        <p>{movieDetail.movie.quality}</p>
                                    </div>
                                    <div className='info-item'>
                                        <span className='if-name'>Thể loại: <p>{movieDetail.movie.category.map(category => category.name).join(', ')}</p></span>
                                    </div>
                                    <div className='info-item'>
                                        <span className='if-name'>Diễn viên: <p>{movieDetail.movie.actor.join(', ')}</p></span>
                                        
                                    </div>
                                </div>

                                <div className="movie-text__item">
                                    <div className='info-item'>
                                        <span className='if-name'>Phát hành:</span>
                                        <p>{movieDetail.movie.year}</p>
                                    </div>
                                    <div className='info-item'>
                                        <span className='if-name'>Đạo diễn:</span>
                                        <p>{movieDetail.movie.director}</p>
                                    </div>
                                </div>
                                <div className="movie-text__item">
                                    <div className='info-item'>
                                        <span className='if-name'>Quốc gia:</span>
                                        <p>{movieDetail.movie.country.map(country => country.name)}</p>
                                    </div>
                                    <div className='info-item'>
                                        <span className='if-name'>Thời lượng:</span>
                                        <p>{movieDetail.movie.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="movie-info__desc">
                                <span className=''>Nội dung phim</span>
                                <p>{movieDetail.movie.content}</p>
                            </div>
                            
                            

                        </div>
                        
                    )}
                    
                    {movieDetail && (
                        <div className="fb-comment__section">
                            <FacebookProvider appId="7417768628330111">
                                <Comments href={`https://phimchilla.vercel.app/movie-info/${movieDetail.movie.slug}`} data-width="100%"/>
                            </FacebookProvider>
                        </div>
                    )} 
                </div>
            }
            <Footer></Footer>
        </div>
    )
}

export default MovieDetails