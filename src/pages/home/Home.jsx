import React from "react";
import Filters from "../../components/filters/Filters.jsx";
import CharacterCards from "../../components/characterCards/CharacterCards";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style.home}>
      <div className={style.filter}>
        <Filters />
      </div>
      <CharacterCards />
    </div>
  );
};

export default Home;
