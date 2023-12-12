import React from "react";
import style from "./Filters.module.css";
import { useFilterContext } from "../../context/filterContext.js";

const Filters = () => {
  const {
    // filters: { status, gender, species, type, location },
    all_characters,
    updateFilterValue,
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((currElem) => {
      return currElem[property];
    });
    return (newVal = new Set(newVal));
  };

  const episodeUrl = all_characters.map((item) => item.episode);
  console.log(episodeUrl);

  const statusdata = ["status", ...getUniqueData(all_characters, "status")];
  const locationdata = [
    "location",
    ...new Set(all_characters.map((item) => item.location.name)),
  ];
  const genderdata = ["gender", ...getUniqueData(all_characters, "gender")];
  const speciesdata = ["species", ...getUniqueData(all_characters, "species")];
  const typedata = ["type", ...getUniqueData(all_characters, "type")];

  // const [statusdata, setStatusData] = useState(undefined);
  // const [statusoption, setStatusOption] = useState([]);

  // const [locationdata, setLocationData] = useState(undefined);
  // const [locationoption, setLocationOption] = useState([]);

  // const [episodedata, setEpisodeData] = useState(undefined);
  // const [episodeoption, setEpisodeOption] = useState([]);

  // const [genderdata, setGenderData] = useState(undefined);
  // const [genderoption, setGenderOption] = useState([]);

  // const [speciesdata, setSpeciesData] = useState(undefined);
  // const [speciesoption, setSpeciesOption] = useState([]);

  // const [typedata, setTypeData] = useState(undefined);
  // const [typeoption, setTypeOption] = useState([]);

  // useEffect(() => {
  // const status_options = Array.from(
  //   new Set(filter_characters.map((item) => item.status))
  // );

  // const location_options = Array.from(
  //   new Set(filter_characters.map((item) => item.location.name))
  // );

  // const episode_options = Array.from(
  //   new Set(filter_characters.map((item) => item.location.name))
  // );

  // const gender_options = Array.from(
  //   new Set(filter_characters.map((item) => item.gender))
  // );

  // const species_options = Array.from(
  //   new Set(filter_characters.map((item) => item.species))
  // );

  // const type_options = Array.from(
  //   new Set(filter_characters.map((item) => item.type))
  // );

  // setStatusOption(status_options);
  // setLocationOption(location_options);
  // setEpisodeOption(episode_options);
  // setGenderOption(gender_options);
  // setSpeciesOption(species_options);
  // setTypeOption(type_options);
  // }, []);

  // const onStatusChangeHandler = (event) => {
  //   setStatusData(event.target.value);
  //   console.log("User Selected status's Value - ", event.target.value);
  // };

  // const onLocationChangeHandler = (event) => {
  //   setLocationData(event.target.value);
  //   console.log("User Selected location's Value - ", event.target.value);
  // };

  // const onEpisodeChangeHandler = (event) => {
  //   setEpisodeData(event.target.value);
  //   console.log("User Selected episode's Value - ", event.target.value);
  // };

  // const onGenderChangeHandler = (event) => {
  //   setGenderData(event.target.value);
  //   console.log("User Selected gender's Value - ", event.target.value);
  // };

  // const onSpeciesChangeHandler = (event) => {
  //   setSpeciesData(event.target.value);
  //   console.log("User Selected species's Value - ", event.target.value);
  // };

  // const onTypeChangeHandler = (event) => {
  //   setTypeData(event.target.value);
  //   console.log("User Selected type's Value - ", event.target.value);
  // };

  return (
    <div className={style.filters}>
      <select
        name="status"
        id="status"
        onClick={updateFilterValue}
        // onChange={onStatusChangeHandler}
      >
        {statusdata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="status">
              {currElem}
            </option>
          );
        })}
        {/* <option>status</option>
        {statusoption.map((option, index) => {
          return (
            <option key={index} value={option} name="status">
              {option}
            </option>
          );
        })} */}
      </select>
      <select
        name="location"
        id="location"
        onClick={updateFilterValue}
        // onChange={onLocationChangeHandler}
      >
        {locationdata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="location">
              {currElem}
            </option>
          );
        })}
        {/* <option>location</option>
        {locationoption.map((option, index) => {
          return <option key={index}>{option}</option>;
        })} */}
      </select>
      <select
      //  onChange={onEpisodeChangeHandler}
      >
        {/* <option>episode</option>
        {episodeoption.map((option, index) => {
          return <option key={index}>{option}</option>;
        })} */}
      </select>
      <select
        name="gender"
        id="gender"
        onClick={updateFilterValue}
        // onChange={onGenderChangeHandler}
      >
        {genderdata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="gender">
              {currElem}
            </option>
          );
        })}
        {/* <option>gender</option>
        {genderoption.map((option, index) => {
          return (
            <option key={index} value={option} name="gender">
              {option}
            </option>
          );
        })} */}
      </select>
      <select
        name="species"
        id="species"
        onClick={updateFilterValue}
        // onChange={onSpeciesChangeHandler}
      >
        {speciesdata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="species">
              {currElem}
            </option>
          );
        })}
        {/* <option>species</option>
        {speciesoption.map((option, index) => {
          return <option key={index}>{option}</option>;
        })} */}
      </select>
      <select
        name="type"
        id="type"
        onClick={updateFilterValue}
        // onChange={onTypeChangeHandler}
      >
        {typedata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="type">
              {currElem}
            </option>
          );
        })}
        {/* <option>type</option>
        {typeoption.map((option, index) => {
          return <option key={index}>{option}</option>;
        })} */}
      </select>
    </div>
  );
};

export default Filters;
