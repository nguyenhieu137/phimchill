import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { RiMovie2Fill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { useSearch } from '../../SearchContext';
import "./navbar.scss";
function Navbar() {
  // Lấy đường dẫn hiện tại
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isCategorySubMenuOpen, setIsCategorySubMenuOpen] = useState(false); // State cho submenu của thể loại
  const [isNationSubMenuOpen, setIsNationSubMenuOpen] = useState(false); // State cho submenu của quốc gia
  const [isClosing, setIsClosing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [nations, setNations] = useState([]);
  const { searchKeyword, setSearchKeyword } = useSearch();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleToggleCategorySubMenu = () => {
    setIsCategorySubMenuOpen(!isCategorySubMenuOpen);
  };

  const handleToggleNationSubMenu = () => {
    setIsNationSubMenuOpen(!isNationSubMenuOpen);
  };
  const handleCloseModal = () => {
    //setIsModalOpen(false);
    setIsClosing(true); // Đặt isClosing thành true để kích hoạt hiệu ứng đóng modal
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false); // Đặt lại isClosing thành false sau khi modal đã đóng
      document.body.style.overflow = "auto";
    }, 200); 
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      setSearchKeyword(inputValue.trim());
      localStorage.setItem('searchKeyword', inputValue.trim());
      navigate('/search-page');
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1300);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Đóng modal khi màn hình lớn hơn 1000px
    if (!isSmallScreen) {
      setIsModalOpen(false);
      document.body.style.overflow = "auto";
    }
  }, [isSmallScreen]);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        // Replace this with your API endpoint to fetch categories
        const response = await fetch("https://phimapi.com/the-loai");
        const data = await response.json();
        const filteredCategories = data.filter(category => category.slug !== 'phim-18');
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchNation = async () => {
      try {
        // Replace this with your API endpoint to fetch categories
        const response = await fetch("https://phimapi.com/quoc-gia");
        const data = await response.json();
        setNations(data);
      } catch (error) {
        console.error("Error fetching nation:", error);
      }
    };

    fetchNation();
  }, []);
  return (
    
    <div className="navbar">
      
      <div className="nav-container">
        <div className="logo">
          <Link to ='/'><RiMovie2Fill className="logo-ico"></RiMovie2Fill>PhimChill</Link>
        </div>

        <div className="menu-container">
          <ul className="menu">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Trang chủ</Link>
            </li>
            
            <li className={location.pathname === '/phim-le' ? 'active' : ''}>
              <Link to='/phim-le' className={location.pathname === '/phim-le' ? 'active' : ''}>Phim lẻ</Link>
            </li>

            <li className={location.pathname === '/phim-bo' ? 'active' : ''}>
              <Link to='/phim-bo' className={location.pathname === '/phim-bo' ? 'active' : ''}>Phim bộ</Link>
            </li>
            <li>
              Thể Loại
              <ul className="submenu">
                {categories.map((category, index) => (
                  <li key={index} className="submenu-item">
                    <Link to={`/the-loai/${category.slug}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              Quốc gia
              <ul className="submenu">
                {nations.map((nation, index) => (
                  <li key={index} className="submenu-item">
                    <Link to={`/quoc-gia/${nation.slug}`}>{nation.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>        
        </div>

        <div className="search-bar">
           <input 
              className="search-ip" 
              type="text" 
              placeholder="Bạn muốn tìm phim gì ?"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          <IoSearchOutline className="ic-search"></IoSearchOutline>
        </div>
        {isSmallScreen && (
          <RxHamburgerMenu className="hamburger-icon" onClick={handleOpenModal}></RxHamburgerMenu>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={`modal ${isClosing ? 'closing' : ''}`}>
          
          <IoCloseOutline className="close" onClick={handleCloseModal}></IoCloseOutline>
          <div className="modal-content">
            <div className="menu-container">
              <div className="search-bar">
                <input 
                  className="search-ip" 
                  type="text" 
                  placeholder="Bạn muốn tìm phim gì ?"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <IoSearchOutline className="ic-search"></IoSearchOutline>
              </div>
              <ul className="menu">
                <li className={location.pathname === '/' ? 'active' : ''}>
                  <Link to='/'>Trang chủ</Link>
                </li>
                <li onClick={handleCloseModal} className={location.pathname === '/phim-le' ? 'active' : ''}>
                  <Link to='/phim-le'>Phim lẻ</Link>
                </li>
                <li onClick={handleCloseModal} className={location.pathname === '/phim-bo' ? 'active' : ''}>
                  <Link to='/phim-bo'>Phim bộ</Link>
                </li>
                <li onClick={handleToggleCategorySubMenu} className={location.pathname === '/category' ? 'active' : ''}>
                  Thể loại
                  {isCategorySubMenuOpen && (
                    <ul className="submenu-modal">
                      {categories.map((category, index) => (
                        <li onClick={handleCloseModal} key={index} className="submenu-modal_item">
                          <Link to={`/the-loai/${category.slug}`}>{category.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li onClick={handleToggleNationSubMenu} className={location.pathname === '/category' ? 'active' : ''}>
                  Quốc gia
                  {isNationSubMenuOpen && (
                    <ul className="submenu-modal">
                      {nations.map((nation, index) => (
                        <li onClick={handleCloseModal} key={index} className="submenu-modal_item">
                          <Link to={`/quoc-gia/${nation.slug}`}>{nation.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="overlay" onClick={handleCloseModal}></div>} {/* Overlay */}
    </div>
  );
}

export default Navbar