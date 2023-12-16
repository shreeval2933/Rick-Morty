import React from "react";
import style from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className={style.navigation}>
      <NavLink className={style.link} to="/">
        Home
      </NavLink>
      <NavLink className={style.link} to="/episode">
        Episode
      </NavLink>
      <NavLink className={style.link} to="/location">
        Location
      </NavLink>
    </div>
  );
};

export default Navigation;
