import React, { useEffect, useState } from "react";
import style from "./Episode.module.css";
import image from "../../assets/assets.js";
import { useEpisodeContext } from "../../context/episodeContext.js";
import { useFilterContext } from "../../context/filterContext.js";
import { NavLink } from "react-router-dom";

const Episode = () => {
  const { isLoading } = useEpisodeContext();

  const { filter_episode, Loading } = useFilterContext();

  const [showNoEpisodeMessage, setShowNoEpisodeMessage] = useState(false);

  useEffect(() => {
    // Show the message if filter_episode is empty
    if (!Loading && filter_episode.length === 0) {
      setShowNoEpisodeMessage(true);
    } else {
      setShowNoEpisodeMessage(false);
    }
  }, [filter_episode, Loading]);

  if (isLoading) {
    return (
      <div className={style.loader}>
        <img src={image.loadingicon} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      {Loading ? (
        <div className={style.loader}>
          <img src={image.loadingicon} alt="Loading..." />
        </div>
      ) : (
        <div>
          {filter_episode.length > 0 ? (
            <div className={style.episodecards}>
              {filter_episode.map((post) => {
                const { id, name, air_date, episode } = post;
                return (
                  <div key={id}>
                    <NavLink
                      to={{
                        pathname: `/singleepisode/${id}`,
                      }}
                      className={style.card}
                    >
                      <div className={style.text}>
                        <h2>Name : {name}</h2>
                        <p>episode: {episode}</p>
                        <p>Air_date : {air_date}</p>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {showNoEpisodeMessage && (
                <div className={style.noepisodecards}>
                  <h2>No Episode found for your search.</h2>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Episode;
