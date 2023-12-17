import React, { useEffect, useState } from "react";
import style from "./CharacterCards.module.css";
import image from "../../assets/assets.js";
import { useCharacterContext } from "../../context/characterContext.js";
import { useFilterContext } from "../../context/filterContext.js";
import { NavLink } from "react-router-dom";

const CharacterCards = () => {
  const { isLoading } = useCharacterContext();

  const { filter_characters, Loading } = useFilterContext();

  const [showNoCharacterMessage, setShowNoCharacterMessage] = useState(false);

  useEffect(() => {
    // Show the message if filter_characters is empty
    if (!Loading && filter_characters.length === 0) {
      setShowNoCharacterMessage(true);
    } else {
      setShowNoCharacterMessage(false);
    }
  }, [filter_characters, Loading]);

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
    <div>
      {Loading ? (
        <div className={style.loader}>
          <img src={image.loadingicon} alt="Loading..." />
        </div>
      ) : (
        <div>
          {filter_characters.length > 0 ? (
            <div className={style.charactercards}>
              {filter_characters.map((post) => {
                const { id, image, name, status, origin, species, location } =
                  post;
                return (
                  // To navigate the single character's profile page
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
          ) : (
            <div>
              {showNoCharacterMessage && (
                <div className={style.nocharactercards}>
                  <h2>No character found for selected filters.</h2>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterCards;
