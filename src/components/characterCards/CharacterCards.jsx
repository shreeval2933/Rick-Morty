import React from "react";
import style from "./CharacterCards.module.css";
import image from "../../assets/assets.js";
import { useCharacterContext } from "../../context/characterContext.js";
import { useFilterContext } from "../../context/filterContext.js";
import { NavLink } from "react-router-dom";

const CharacterCards = () => {
  const { isLoading } = useCharacterContext();

  const { filter_characters } = useFilterContext();

  // Display loading spinner when data is still loading
  if (isLoading) {
    return (
      <div className={style.loader}>
        <img src={image.loadingicon} alt="Loading..." />
      </div>
    );
  }

  // Render the character cards on the Home page if data has been loaded
  return (
    <div className={style.charactercards}>
      {filter_characters.map((post) => {
        const { id, image, name, status, origin, species, location } = post;
        return (
          //To navigate the single character's profile page
          <NavLink
            to={{
              pathname: `/singlecharacter/${id}`,
            }}
            key={id}
            className={style.card}
          >
            <img src={image} alt={name} />
            <div className={style.text}>
              <h2>{name}</h2>
              <p>
                {status} - {species}
              </p>
              <p>origin: {origin["name"]}</p>
              <p>Last known location: {location["name"]}</p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default CharacterCards;
