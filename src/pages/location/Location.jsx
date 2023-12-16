import React from "react";
import style from "./Location.module.css";
import image from "../../assets/assets.js";
import { useLocationContext } from "../../context/locationContext.js";
import { useFilterContext } from "../../context/filterContext.js";
import { NavLink } from "react-router-dom";

const Location = () => {
  const { isLoading } = useLocationContext();

  const { filter_location } = useFilterContext();

  if (isLoading) {
    return (
      <div className={style.loader}>
        <img src={image.loadingicon} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className={style.locationcards}>
      {filter_location.map((post) => {
        const { id, name, type, dimension } = post;
        return (
          <div key={id}>
            <NavLink
              to={{
                pathname: `/singlelocation/${id}`,
              }}
              className={style.card}
            >
              <div className={style.text}>
                <h2>Name : {name}</h2>
                <p>Type : {type}</p>
                <p>Dimension: {dimension}</p>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default Location;
