import React, { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    // Kiểm tra xem có từ khóa tìm kiếm đã được lưu trong local storage không
    const storedKeyword = localStorage.getItem("searchKeyword");
    if (storedKeyword) {
      setSearchKeyword(storedKeyword);
    }
  }, []); 
  return (
    <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>
      {children}
    </SearchContext.Provider>
  );
};
