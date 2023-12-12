import React from "react";
import style from "./Navbar.module.css";
import image from "../../assets/assets.js";
import { useFilterContext } from "../../context/filterContext.js";
import { useState } from "react";

const Navbar = () => {
  const {
    filters: { search_text },
    updateFilterValue,
  } = useFilterContext();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${style.navbar} ${isExpanded ? style.expandedNavbar : ""}`}
    >
      <div className={`${style.logo} ${isExpanded ? style.expandedLogo : ""}`}>
        <img src={image.logo} alt="logo" />
      </div>
      <div
        className={`${style.heading} ${
          isExpanded ? style.expandedHeading : ""
        }`}
      >
        Rick and Morty
      </div>
      <div
        className={`${style.searchbar} ${
          isExpanded ? style.expandedSearchbar : ""
        }`}
      >
        <input
          type="text"
          name="search_text"
          value={search_text}
          onChange={updateFilterValue}
          placeholder="search..."
          className={`${style.inputbox} ${
            isExpanded ? style.expandedInputbox : ""
          }`}
        />
        <div className={style.btn} onClick={handleButtonClick}>
          <img src={image.searchicon} alt="searchicon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
