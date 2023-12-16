import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocationContext } from "../../context/locationContext.js";
import axios from "axios";
import style from "./SingleLocation.module.css";
import image from "../../assets/assets.js";

const SingleCharacter = () => {
  const { locationid } = useParams();
  const { location, isLoading } = useLocationContext();
  const [characterName, setCharacterName] = useState([]);
  const [characterImg, setCharacterImg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const selectedLocation = location.find(
        (data) => data.id.toString() === locationid.toString()
      );

      if (selectedLocation) {
        // Fetch character names
        const names = await getCharacterName(selectedLocation.residents);

        // Fetch character images
        const images = await getCharacterImg(selectedLocation.residents);

        setCharacterName(names);
        setCharacterImg(images);
      }
    };

    fetchData();
  }, [locationid, location]);

  const getCharacterName = async (characterslink) => {
    try {
      const promises = characterslink.map(async (link) => {
        const res = await axios.get(link);
        return res.data.name;
      });

      return Promise.all(promises);
    } catch (error) {
      console.log("Error fetching character's name data:", error);
      throw error;
    }
  };

  const getCharacterImg = async (characterslink) => {
    try {
      const promises = characterslink.map(async (link) => {
        const res = await axios.get(link);
        return res.data.image;
      });

      return Promise.all(promises);
    } catch (error) {
      console.log("Error fetching character's name data:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className={style.loader}>
        <img src={image.loadingicon} alt="Loading...." />
      </div>
    );
  }

  return (
    <div className={style.locationcontainer}>
      <div className={style.charactersdata}>
        {characterImg &&
        characterName &&
        characterImg.length === characterName.length ? (
          characterImg.map((img, index) => (
            <div key={index} className={style.singlechar}>
              <img src={img} alt="" />
              <p>{characterName[index]}</p>
            </div>
          ))
        ) : (
          <h2>There are no characters found for this Location.</h2>
        )}
      </div>
    </div>
  );
};

export default SingleCharacter;
