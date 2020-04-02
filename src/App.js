import React from "react";
import "milligram";
import "./App.css";
import AthleteSearch from "./components/search";

function App() {
  return (
    <div className="container">

      <div className="row">
        <div className="column">
          <h1>HEAD TO HEAD</h1>
        </div>
      </div>

      <div className="row">
        <div className="column">
          <AthleteSearch/>
        </div>

        <div className="column">
          <AthleteSearch/>
        </div>

      </div>
    </div>
  );
}

export default App;
