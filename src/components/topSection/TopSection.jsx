import React from "react";
import Navbar from "../navbar/Navbar.jsx";
import Filters from "../filters/Filters.jsx";
import style from "./TopSection.module.css";

const TopSection = () => {
  return (
    <div className={style.topsection}>
      <Navbar />
      <Filters />
    </div>
  );
};

export default TopSection;
