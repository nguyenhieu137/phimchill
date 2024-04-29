import React from 'react'
import './footer.scss'
import { RiMovie2Fill } from "react-icons/ri";

function Footer() {
  return (
    <div className='footer-section'>
        <div className="footer-container">
            <div className="logo">
                <a className='logo-footer' href="/"><RiMovie2Fill className='logoic-footer'></RiMovie2Fill>PhimChill</a>
                <span>PhimChill chúc các bạn xem phim vui vẻ !</span>
            </div>
        </div>
    </div>
  )
}

export default Footer