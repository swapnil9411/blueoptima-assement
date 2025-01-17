import React, { useState, useRef } from "react";
import WidgetHeader from "./components/WidgetHeader";
import WidgetBody from "./components/WidgetBody";
import Widget from "./components/Widget";
import "./LocationWidget.css";

const LocationWidget = ({ locations }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHorizontalMinimized, setIsHorizontalMinimized] = useState(false);

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

  return (
    <Widget
      isMinimized={isMinimized}
      isHorizontalMinimized={isHorizontalMinimized}
    >
      <WidgetHeader
        isMinimized={isMinimized}
        isHorizontalMinimized={isHorizontalMinimized}
        toggleHorizontalMinimized={toggleHorizontalMinimized}
        toggleMinimized={toggleMinimized}
      />
      <WidgetBody locations={locations} />
    </Widget>
  );
};

export default LocationWidget;
