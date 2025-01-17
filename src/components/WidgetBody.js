import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
const WidgetBody = ({ locations }) => {
  const [checkedLocations, setCheckedLocations] = useState({});
  const [areCheckedAll, setCheckAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = useRef(null);
  const filteredLocations = locations
    .filter((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort();

  const uniqueLetters = Array.from(
    new Set(locations.map((loc) => loc.split(" - ")[0][0].toUpperCase()))
  ).sort();
  const countryFlags = {
    India: "https://flagcdn.com/in.svg",
    Ukraine: "https://flagcdn.com/ua.svg",
    Poland: "https://flagcdn.com/pl.svg",
    Russia: "https://flagcdn.com/ru.svg",
    Canada: "https://flagcdn.com/ca.svg",
    China: "https://flagcdn.com/cn.svg",
  };
  const handleCheckboxChange = (location) => {
    const scrollPosition = listRef.current.scrollTop;
    console.log("location", location);
    listRef.current.children = null;

    setCheckedLocations((prev) => {
      const checkedItem = {
        ...prev,
        [location]: !prev[location],
      };

      const locationList = Object.entries(checkedItem);
      const isAllChecked_false = locationList.every(([key, value]) => !value);
      if (isAllChecked_false) {
        setCheckAll(false);
      }
      return checkedItem;
    });

    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = scrollPosition;
      }
    }, 0);
  };

  const clearAll = () => {
    setCheckedLocations({});
    setCheckAll(false);
  };

  const checkAll = () => {
    const allChecked = {};
    filteredLocations.forEach((loc) => {
      allChecked[loc] = true;
    });
    setCheckedLocations(allChecked);
    setCheckAll(true);
  };

  const toggleCheckAll = () => {
    if (areCheckedAll) {
      clearAll();
    } else {
      checkAll();
    }
  };

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
  const maskLocationName = (loc) => {
    const MAX_LENGTH = 14;
    if (loc.length > MAX_LENGTH) {
      return loc.slice(0, MAX_LENGTH) + "...";
    } else return loc;
  };

  return (
    <div id="widget-body">
      <div className="widget-container_search">
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
      </div>

      <div className="action-header">
        <div className="action-buttons">
          <button className="check-button" onClick={toggleCheckAll}>
            <span className="action-title">
              {areCheckedAll ? (
                <span>
                  <FontAwesomeIcon className="cross-icon" icon={faTimes} />
                  Clear All
                </span>
              ) : (
                "Check All"
              )}
            </span>
          </button>
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
                    className="checkbox-location"
                  />
                  <img
                    src={countryFlags[country]}
                    alt={country}
                    className="flag-icon"
                  />
                  <span className="location-text">{maskLocationName(loc)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WidgetBody;
