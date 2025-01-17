import React from "react";
import LocationWidget from "./LocationWidget";

const locations = [
  "Delhi - India",
  "Kyiv - Ukraine",
  "Warsaw - Poland",
  "Moscow - Russia",
  "Halifax - Canada",
  "Beijing - China",
  "Mumbai - India",
  "Westbengal - India",
  "Lyviv - Ukraine",
  "Luhansk - Ukraine",
  "Wrocław - Poland",
  "Saint Petersburg - Russia",
  "Novosibirsk - Russia",
  "Toronto - Canada",
  "Shanghai - China",
];

const App = () => {
  return (
    <div className="appcontainer">
      <LocationWidget locations={locations} />
    </div>
  );
};

export default App;
