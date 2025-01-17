const Widget = ({ isHorizontalMinimized, isMinimized, children }) => {
  const classMinimized = isMinimized
    ? "minimized"
    : isHorizontalMinimized
    ? "horizontal-minimized"
    : "";
  return <div className={`widget-container ${classMinimized}`}>{children}</div>;
};

export default Widget;
