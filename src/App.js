import React, { useEffect, useState } from "react";
import "milligram";
import "./App.css";
import Participant from "./components/participant";

function App() {

  let [p1Races, setp1Races] = useState([]);
  let [p2Races, setp2Races] = useState([]);

  let [bothRaced, setBothRaced] = useState({});

  const setRaces = (p1, p2) => {
    p1 && setp1Races(p1);
    p2 && setp2Races(p2);
  };

  useEffect(() => {

    if (p1Races.length && p2Races.length) {
      const commonRaces = {};
      const p2RaceCodes = p2Races.map(x => x.eventCode);
      for (let race of p1Races) {
        const idx = p2RaceCodes.indexOf(race.eventCode);
        if (idx > -1) {
          commonRaces[race.eventCode] = [race, p2Races[idx]];
        }
      }
      setBothRaced({ ...commonRaces });
    }

  }, [p1Races, p2Races]);

  const headToHead = () => {
    if (Object.keys(bothRaced).length) {
      return (
        <div className="row">
          <div className="column">Athlete 1</div>
          <div className="column"></div>
          <div className="column">Athlete 2</div>
        </div>
      );
    }
    return "";
  };

  return (
    <div className="container">

      <div className="row">
        <div className="column">
          <h1>HEAD TO HEAD</h1>
        </div>
      </div>

      <div className="row">
        <div className="column">
          <Participant setParticipantRaces={x => setRaces(x, null)}/>
        </div>

        <div className="column">
          <Participant setParticipantRaces={x => setRaces(null, x)}/>
        </div>
      </div>

      <div className="row">
        <div className="column" style={{ textAlign: "center" }}>
          {headToHead()}
          {bothRaced && Object.entries(bothRaced).map(([k, v]) => {
            return (
              <div className="row flex flex-middle" key={k}>
                <div className="column">{bothRaced[k][0].actualTime}</div>
                <div className="column">{bothRaced[k][0].eventName}</div>
                <div className="column">{bothRaced[k][1].actualTime}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
