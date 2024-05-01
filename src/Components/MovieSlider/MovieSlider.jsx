import React, { useState, useEffect } from 'react';
import './movieslider.scss'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import axios from 'axios';

function MovieSlider() { 
    const [movies, setMovies] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0); 
    const [slideDirection, setSlideDirection] = useState(null);
    
    // API - phim mới cập nhật  
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=3&limit=5');
                setMovies(response.data.items); 
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const nextSlide = () => {
        setCurrentSlide(currentSlide === movies.length - 1 ? 0 : currentSlide + 1);
        setSlideDirection('next');
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? movies.length - 1 : currentSlide - 1);
        setSlideDirection('prev');
    };

    const handleRemoveEpisodes = () => {
        localStorage.removeItem("selectedEpisode")
    }
    return (
        <div className="slider-section">
            
            <div className='slider-container'>
                {movies.length > 0 && (
                    <div className='movie-info'>
                        <img 
                            src={movies[currentSlide].thumb_url} 
                            alt={movies[currentSlide].name} 
                            loading='lazy'
                            srcSet={`${movies[currentSlide].thumb_url} 1920w, ${movies[currentSlide].thumb_url} 1024w, ${movies[currentSlide].thumb_url} 768w`}
                            sizes=" 
                                    (max-width: 1920px) 10%,
                                    (max-width: 1024px) 20%,
                                    (max-width: 768px) 10%, 30,3%
                                "
                        />
                    </div>
                )}
                <div className="movie-text">
                    <div className="text-container">
                        {movies.length > 0 && (
                            <>
                                <span>{movies[currentSlide].name}</span>
                                <p>{movies[currentSlide].year}</p>
                            </>
                        )}
                    </div>
                    <Link to={movies.length > 0 ? `/watch-movie/${movies[currentSlide].slug}` : '/'} onClick={() => handleRemoveEpisodes()} className='slide-btn'>Xem Phim</Link>
                </div>
                <Link to={movies.length > 0 ? `/watch-movie/${movies[currentSlide].slug}` : '/'} onClick={() => handleRemoveEpisodes()}><BsPlayFill className="play-icon" /></Link>
                <button className='prev-btn' onClick={prevSlide}><MdKeyboardArrowLeft className='icon'></MdKeyboardArrowLeft></button>
                <button className='next-btn' onClick={nextSlide}><MdKeyboardArrowRight className='icon'></MdKeyboardArrowRight></button>
            </div>
        </div>
    );
}

export default MovieSlider;