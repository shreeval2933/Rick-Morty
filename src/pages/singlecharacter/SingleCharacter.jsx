import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCharacterContext } from "../../context/characterContext.js";
import axios from "axios";
import style from "./SingleCharacter.module.css";
import image from "../../assets/assets.js";

const SingleCharacter = () => {
  const { characterid } = useParams();
  const { isLoading, characters } = useCharacterContext();
  const [characterData, setCharacterData] = useState(null);
  const [episodeData, setEpisodeData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [originData, setOriginData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Filter the characters based on characterid
      const selectedCharacter = characters.find(
        (data) => data.id.toString() === characterid.toString()
      );

      // Set the characterData if found
      if (selectedCharacter) {
        setCharacterData(selectedCharacter);

        // Set episodeData
        const episode = selectedCharacter.episode;

        // Set locationData
        const location = selectedCharacter.location.url;

        const origin = selectedCharacter.origin.url;

        // Fetch episode and location data
        try {
          const [episodes, locationInfo, originInfo] = await Promise.all([
            getEpisodedata(episode),
            axios.get(location),
            origin ? axios.get(origin) : null,
          ]);

          setEpisodeData(episodes);
          setLocationData(locationInfo);
          setOriginData(originInfo);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [characterid, characters]);

  const getEpisodedata = async (episodeLinks) => {
    try {
      const promises = episodeLinks.map(async (link) => {
        const res = await axios.get(link);
        return res.data;
      });

      return Promise.all(promises);
    } catch (error) {
      console.log("Error fetching episode data:", error);
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
    <div className={style.singlecharacterdata}>
      {characterData ? (
        <div className={style.singlecharacter}>
          <img src={characterData.image} alt="" />
          <div className={style.personalinfo}>
            <h1>{characterData.name}</h1>
            <div className={style.namedata}>
              <p>
                <b>Species : </b>
                {characterData.species}
              </p>
              <p>
                <b>Gender : </b>
                {characterData.gender}
              </p>
              <p>
                <b>Status : </b>
                {characterData.status}
              </p>
              <p>
                <b>Type : </b>
                {characterData.type ? characterData.type : "Not known"}
              </p>
            </div>
          </div>
          <div className={style.origininfo}>
            {originData ? (
              <div>
                <h2>Origin : {originData.data.name}</h2>
                <div>
                  <p>
                    <b>Type : </b>
                    {originData.data.type}
                  </p>
                  <p>
                    <b>Dimension : </b>
                    {originData.data.dimension}
                  </p>
                  <p>
                    <b> Amount of residents : </b>
                    {originData.data.residents.length}
                  </p>
                </div>
              </div>
            ) : (
              <h2>Unknown Origin</h2>
            )}
          </div>
          <div className={style.locationinfo}>
            {locationData ? (
              <div>
                <h2>Location : {locationData.data.name}</h2>
                <div>
                  <p>
                    <b>Type : </b>
                    {locationData.data.type}
                  </p>
                  <p>
                    <b>Dimension : </b>
                    {locationData.data.dimension}
                  </p>
                  <p>
                    <b> Amount of residents : </b>
                    {locationData.data.residents.length}
                  </p>
                </div>
              </div>
            ) : (
              <h2>Unknown Location</h2>
            )}
          </div>
          <div className={style.episodeinfo}>
            <h2>Episode names:</h2>
            {episodeData ? (
              <div>
                {episodeData.map((data) => (
                  <p key={data.id}>{data.name}</p>
                ))}
              </div>
            ) : (
              <h2>No Episodes for this character.</h2>
            )}
          </div>
        </div>
      ) : (
        <h2>Character not found</h2>
      )}
    </div>
  );
};

export default SingleCharacter;
