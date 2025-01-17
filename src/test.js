import React, { useState, useRef } from "react";
import "./LocationWidget.css";
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
import { ArrowLeftToLine, ArrowRightToLine, PanelTop } from "lucide-react";

const countryFlags = {
  India: "https://flagcdn.com/in.svg",
  Ukraine: "https://flagcdn.com/ua.svg",
  Poland: "https://flagcdn.com/pl.svg",
  Russia: "https://flagcdn.com/ru.svg",
  Canada: "https://flagcdn.com/ca.svg",
  China: "https://flagcdn.com/cn.svg",
};

const LocationWidget = ({ locations }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHorizontalMinimized, setIsHorizontalMinimized] = useState(false);
  const [checkedLocations, setCheckedLocations] = useState({});
  const [areCheckedAll, setCheckAll] = useState(false);
  const listRef = useRef(null);

  const locationsOBJ = locations.map((location) => ({
    name: location,
    isChecked: false,
  }));
  const filteredLocations = locationsOBJ
    .filter((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort();

  const uniqueLetters = Array.from(
    new Set(
      locationsOBJ.map((loc) => loc.name.split(" - ")[0][0].toUpperCase())
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
    if (!isMinimized && !isHorizontalMinimized) {
      setIsMinimized(!isMinimized);
    } else if (isMinimized) {
      setIsMinimized(!isMinimized);
    } else if (isHorizontalMinimized) {
      setIsMinimized(true);
      setIsHorizontalMinimized(false);
    }
  };

  const toggleHorizontalMinimized = () => {
    setIsHorizontalMinimized(!isHorizontalMinimized);
  };

  const handleCheckboxChange = (location) => {
    console.log("location", location);
    listRef.current.children = null;
    const item = filteredLocations.find((item) => item.loc == location);

    setCheckedLocations((prev) => {
      const checkedItem = {
        ...prev,
        [location]: !prev[location],
      };
      console.log(checkedItem);
      const locationList = Object.entries(checkedItem);
      const isAllChecked_false = locationList.every(([key, value]) => !value);
      if (isAllChecked_false) {
        setCheckAll(false);
      }
      return checkedItem;
    });
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

  const maskLocationName = (loc) => {
    const MAX_LENGTH = 14;
    if (loc.length > MAX_LENGTH) {
      return loc.slice(0, MAX_LENGTH) + "...";
    } else return loc;
  };

  const Header = () => {
    if (isMinimized) {
      return (
        <div className="widget-container-header minimized-header">
          <div>
            <h3>Locations </h3>
          </div>
          <div className="widget-controls">
            <button className="control-button" onClick={toggleMinimized}>
              {/* <FontAwesomeIcon icon={faChevronRight} /> */}
              <ArrowRightToLine size={20} />
            </button>
          </div>
        </div>
      );
    } else if (isHorizontalMinimized) {
      return (
        <div className="widget-container_header">
          <div>
            <h3>Locations </h3>
          </div>
          <div className="widget-controls">
            <button
              className="control-button"
              onClick={toggleHorizontalMinimized}
            >
              <PanelTop size={18} />
            </button>
            <button className="control-button" onClick={toggleMinimized}>
              <ArrowLeftToLine size={18} />
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="widget-container_header">
          <div>
            <h3>Locations </h3>
          </div>
          <div className="widget-controls">
            <button
              className="control-button"
              onClick={toggleHorizontalMinimized}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button className="control-button" onClick={toggleMinimized}>
              {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
              <ArrowLeftToLine size={20} />
            </button>
          </div>
        </div>
      );
    }
  };

  const Widget = ({ children }) => {
    const classMinimized = isMinimized
      ? "minimized"
      : isHorizontalMinimized
      ? "horizontal-minimized"
      : "";
    return (
      <div className={`widget-container ${classMinimized}`}>{children}</div>
    );
  };

  const WidgetBody = () => {
    return (
      <div className="widget-body">
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
                    <span className="location-text">
                      {maskLocationName(loc)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={`widget-containers ${isMinimized ? "minimized" : ""}`}>
      <Widget>
        <Header />
        <WidgetBody />
      </Widget>
    </div>
  );
};

export default LocationWidget;
