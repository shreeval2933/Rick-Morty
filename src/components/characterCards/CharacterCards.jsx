import React from "react";
import style from "./CharacterCards.module.css";
import { useState, useEffect } from "react";
import axios from "../../axios.jsx";
import { useCharacterContext } from "../../context/characterContext.js";
import { useFilterContext } from "../../context/filterContext.js";

const CharacterCards = (props) => {
  // const [apiData, setApiData] = useState([]);
  // const [isError, setIsError] = useState("");

  const { isLoading, characters } = useCharacterContext();

  const { filter_characters } = useFilterContext();

  // const getApiData = async () => {
  //   try {
  //     const res = await axios.get("/character");
  //     setApiData(res.data.results);
  //   } catch (error) {
  //     console.log(error);
  //     setIsError(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getApiData();
  // }, []);

  if (isLoading) {
    return <div>......Loading</div>;
  }

  return (
    <div className={style.charactercards}>
      {/* {apiData.map((post) => { */}
      {filter_characters.map((post) => {
        const { id, image, name, status, origin, species, location } = post;
        return (
          <div className={style.card} onClick={() => {}} key={id}>
            <img src={image} alt={`photo's of ${name}`} />
            <h2>{name}</h2>
            <p>
              {status} - {species}
            </p>
            <p>origin: {origin["name"]}</p>
            <p>Last known location: {location["name"]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterCards;
