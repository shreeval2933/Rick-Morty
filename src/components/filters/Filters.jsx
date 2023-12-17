import React from "react";
import style from "./Filters.module.css";
import { useFilterContext } from "../../context/filterContext.js";

const Filters = () => {
  // Destructure values and functions from the filter context
  const {
    all_characters,
    episode_name_data,
    updateFilterValue,
    resetFiltersValue,
  } = useFilterContext();

  //function to get unique data values for a given property
  const getUniqueData = (data, property) => {
    let newVal = data.map((currElem) => {
      return currElem[property];
    });
    return (newVal = new Set(newVal));
  };

  // data arrays for each filter dropdown
  const statusdata = ["status", ...getUniqueData(all_characters, "status")];
  const locationdata = [
    "location",
    ...new Set(all_characters.map((item) => item.location.name)),
  ];

  const episodedata = ["episode", ...episode_name_data.map((item) => item)];
  const genderdata = ["gender", ...getUniqueData(all_characters, "gender")];
  const speciesdata = ["species", ...getUniqueData(all_characters, "species")];
  const typedata = ["type", ...getUniqueData(all_characters, "type")];

  // Reset all filters to their initial values
  const handleResetFilters = () => {
    // Reset each select element to index 0
    document.querySelectorAll("select").forEach((select) => {
      select.selectedIndex = 0;
    });

    // Call the resetFiltersValue function from the Filter context
    resetFiltersValue();
  };

  // Render the filter dropdowns and reset button
  return (
    <div className={style.filters}>
      {/* Status Filter */}
      <select name="status" id="status" onChange={updateFilterValue}>
        {statusdata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="status">
              {currElem}
            </option>
          );
        })}
      </select>

      {/* Location Filter */}
      <select name="location" id="location" onChange={updateFilterValue}>
        {locationdata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="location">
              {currElem}
            </option>
          );
        })}
      </select>

      {/* Episode Filter */}
      <select name="episode" id="episode" onChange={updateFilterValue}>
        {episodedata.map((currElem, index) => {
          return (
            <option key={index} value={index} name="episode">
              {currElem}
            </option>
          );
        })}
      </select>

      {/* Gender Filter */}
      <select name="gender" id="gender" onChange={updateFilterValue}>
        {genderdata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="gender">
              {currElem}
            </option>
          );
        })}
      </select>

      {/* Species Filter */}
      <select name="species" id="species" onChange={updateFilterValue}>
        {speciesdata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="species">
              {currElem}
            </option>
          );
        })}
      </select>

      {/* Type Filter */}
      <select name="type" id="type" onChange={updateFilterValue}>
        {typedata.map((currElem, index) => {
          return (
            <option key={index} value={currElem} name="type">
              {currElem}
            </option>
          );
        })}
      </select>
      <button onClick={handleResetFilters}>Reset&nbsp;Filters</button>
    </div>
  );
};

export default Filters;
