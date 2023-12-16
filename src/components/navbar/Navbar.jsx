import React from "react";
import style from "./Navbar.module.css";
import image from "../../assets/assets.js";
import { useFilterContext } from "../../context/filterContext.js";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navigation from "../navigation/Navigation.jsx";

const Navbar = () => {
  const {
    filters: { search_text },
    updateFilterValue,
  } = useFilterContext();

  // State to manage the expanded/collapsed className of the Navbar to make it responsive
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state of the Navbar
  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Render the Navbar with logo, heading, and search bar
  return (
    <>
      <div
        className={`${style.navbar} ${isExpanded ? style.expandedNavbar : ""}`}
      >
        <div
          className={`${style.logo} ${isExpanded ? style.expandedLogo : ""}`}
        >
          <NavLink to="/">
            <img src={image.logo} alt="logo" />
          </NavLink>
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
      <Navigation />
    </>
  );
};

export default Navbar;
