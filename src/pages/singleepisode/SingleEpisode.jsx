import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useEpisodeContext } from "../../context/episodeContext.js";
import axios from "axios";
import style from "./SingleEpisode.module.css";
import image from "../../assets/assets.js";

const SingleEpisode = () => {
  const { episodeid } = useParams();
  const { episode, isLoading } = useEpisodeContext();
  const [characterName, setCharacterName] = useState([]);
  const [characterImg, setCharacterImg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const selectedEpisode = episode.find(
        (data) => data.id.toString() === episodeid.toString()
      );

      if (selectedEpisode) {
        // Fetch character names
        const names = await getCharacterName(selectedEpisode.characters);

        // Fetch character images
        const images = await getCharacterImg(selectedEpisode.characters);

        setCharacterName(names);
        setCharacterImg(images);
      }
    };

    fetchData();
  }, [episodeid, episode]);

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
    <div className={style.episodecontainer}>
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
          <h2>There are no characters found for this Episode.</h2>
        )}
      </div>
    </div>
  );
};

export default SingleEpisode;
