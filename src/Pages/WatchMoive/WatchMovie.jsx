import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './watchmovie.scss'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';
import ApiService from '../../Services/ApiServices';
import PuffLoader from "react-spinners/PuffLoader";
import { FacebookProvider, Comments } from 'react-facebook';
function WatchMovie() {
    const { slug, episodeSlug } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const data = await ApiService.getMovieInfo(slug);
                setMovieDetail(data);
                setLoading(false);
                
                const selectedEpisodeData = JSON.parse(localStorage.getItem('selectedEpisode'))
                if (selectedEpisodeData) {
                    setSelectedEpisode(selectedEpisodeData);
                } else {
                    setSelectedEpisode(data.episodes[0].server_data[0]);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [slug]);


    // Hàm xử lý khi chọn một tập phim từ danh sách
    const handleEpisodeSelect = (episode) => {
        setSelectedEpisode(episode);
        window.location.reload();
        localStorage.setItem('selectedEpisode', JSON.stringify(episode));
    };

    const isEpisodeSelected = (episode) => {
        // Kiểm tra xem selectedEpisode có tồn tại không
        if (selectedEpisode) {
            // So sánh các thuộc tính cụ thể của tập phim với selectedEpisode
            return episode.slug === selectedEpisode.slug; // Ví dụ: so sánh theo slug
        }
        return false;
    };
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
                                <div className="movie-embed__container">
                                        {/* Hiển thị video tương ứng với tập phim được chọn */}
                                        {selectedEpisode && (
                                            <iframe
                                                src={selectedEpisode.link_embed}
                                                title={selectedEpisode.name}
                                                allowFullScreen
                                            />
                                        )}
                                    </div>
                            </div>

                           {movieDetail && (movieDetail.movie.type === 'series' || movieDetail.movie.type === 'hoathinh') && (
                                <div className="newest-ep">
                                    <span>Tập phim:</span>
                                    {movieDetail.episodes && movieDetail.episodes.length > 0 && movieDetail.episodes[0].server_data ? (
                                        movieDetail.episodes[0].server_data.map((episode, index) => (
                                            <button
                                                className={`ep-item ${isEpisodeSelected(episode) ? 'active' : ''}`}
                                                onClick={() => handleEpisodeSelect(episode)}
                                                key={index}
                                            >
                                                {episode.name}
                                            </button>
                                        ))
                                    ) : (
                                        <p>Không có tập phim nào.</p>
                                    )}
                                </div>
                            )}
                            
                            
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

export default WatchMovie
