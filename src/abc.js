import React, { useState, useRef } from "react";
import "./LocationWidget.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faChevronUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const countryFlags = {
  India: "https://flagcdn.com/in.svg",
  Ukraine: "https://flagcdn.com/ua.svg",
  "United Kingdom": "https://flagcdn.com/gb.svg",
  Poland: "https://flagcdn.com/pl.svg",
  Russia: "https://flagcdn.com/ru.svg",
  Canada: "https://flagcdn.com/ca.svg",
  China: "https://flagcdn.com/cn.svg",
};

const LocationWidget = ({ locations }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [checkedLocations, setCheckedLocations] = useState({});
  const listRef = useRef(null);

  const filteredLocations = locations
    .filter((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort();

  const uniqueLetters = Array.from(
    new Set(
      filteredLocations.map((loc) => loc.split(" - ")[0][0].toUpperCase())
    )
  ).sort();

  const scrollToLetter = (letter) => {
    if (!listRef.current) return;
    const listItems = Array.from(listRef.current.children);
    const targetItem = listItems.find((item) => {
      const cityName = item.querySelector(".location-text")?.textContent || "";
      return cityName[0].toUpperCase() === letter;
    });
    if (targetItem) {
      targetItem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const handleCheckboxChange = (location) => {
    setCheckedLocations((prev) => ({
      ...prev,
      [location]: !prev[location],
    }));
  };

  const clearAll = () => {
    setCheckedLocations({});
  };

  const checkAll = () => {
    const allChecked = {};
    filteredLocations.forEach((loc) => {
      allChecked[loc] = true;
    });
    setCheckedLocations(allChecked);
  };

  const areAllChecked =
    filteredLocations.length === Object.keys(checkedLocations).length;

  const toggleCheckAll = () => {
    if (areAllChecked) {
      clearAll();
    } else {
      checkAll();
    }
  };

  return (
    <div className={`widget-container ${isMinimized ? "minimized" : ""}`}>
      {!isMinimized && (
        <div className="widget-header">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="search-box"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="widget-controls">
            <button className="control-button" onClick={toggleMinimized}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        </div>
      )}
      {isMinimized && (
        <div className="minimized-header">
          <button className="control-button" onClick={toggleMinimized}>
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <div className="minimized-content">
            <p>Selected Locations:</p>
            <ul className="minimized-list">
              {Object.keys(checkedLocations).map((location, idx) => (
                <li key={idx} className="minimized-list-item">
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {!isMinimized && (
        <div className="widget-body">
          <div className="action-buttons">
            <button className="check-button" onClick={toggleCheckAll}>
              {areAllChecked ? "Clear All" : "Check All"}
            </button>
          </div>
          <div className="container-list">
            <div className="width-90">
              <ul className="location-list" ref={listRef}>
                {filteredLocations.map((loc, idx) => {
                  const [city, country] = loc.split(" - ");
                  return (
                    <li key={idx} className="location-item">
                      <input
                        type="checkbox"
                        checked={!!checkedLocations[loc]}
                        onChange={() => handleCheckboxChange(loc)}
                      />
                      <img
                        src={countryFlags[country]}
                        alt={country}
                        className="flag-icon"
                      />
                      <span className="location-text">{loc}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="width-15">
              <ul className="alphabet-list">
                {uniqueLetters.map((letter) => (
                  <li
                    key={letter}
                    className="alphabet-item"
                    onClick={() => scrollToLetter(letter)}
                  >
                    {letter}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationWidget;
