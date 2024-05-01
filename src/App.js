import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar"
import "./App.scss";
import MainPage from "./Pages/MainPage/MainPage";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import WatchMovie from "./Pages/WatchMoive/WatchMovie";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import NationPage from "./Pages/NationPage/NationPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import { SearchProvider } from "./SearchContext";
function App() {

  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phim-le" element={<MainPage />}></Route>
        <Route path="/phim-bo" element={<MainPage />}></Route>
        <Route path="/phim-hoat-hinh" element={<MainPage />}></Route>
        <Route path="/tv-shows" element={<MainPage />}></Route>
        <Route path="/the-loai/:slug" element={<CategoryPage />}></Route>
        <Route path="/quoc-gia/:slug" element={<NationPage />}></Route>
        <Route path="/search-page" element={<SearchPage />}></Route>
        <Route path="/movie-info/:slug" element={<MovieDetails />} />
        <Route path="/watch-movie/:slug/" element={<WatchMovie />}></Route>
      </Routes>
    </SearchProvider>
  );
}

export default App;
