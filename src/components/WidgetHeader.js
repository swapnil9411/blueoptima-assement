import {
  faMinus,
  
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowLeftToLine, ArrowRightToLine, PanelTop } from "lucide-react";
const Header = ({
  isMinimized,
  isHorizontalMinimized,
  toggleHorizontalMinimized,
  toggleMinimized,
}) => {
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

export default Header;
