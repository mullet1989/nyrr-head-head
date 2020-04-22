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
          <div className="column"/>
          <div className="column"/>
          <div className="column"/>
        </div>
      );
    }
    return "";
  };

  return (
    <div className="container">

      <div className="row">
        <div className="column" style={{ marginTop: "10px" }}>
          <h1 style={{ textAlign: "center" }}>NYRR HEAD TO HEAD</h1>
          <div style={{ padding: "10px", borderLeft: ".3rem solid #9b4dca", backgroundColor: "#f4f5f6" }}>
            <span>search two athletes to compare their results in nyrr history</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="column">
          <h4 style={{ textAlign: "left", marginTop: "2rem" }}>RED CORNER 🥊</h4>
          <Participant setParticipantRaces={x => setRaces(x, null)}/>
        </div>

        <div className="column">
          <h4 style={{ textAlign: "right", marginTop: "2rem" }}>BLUE CORNER</h4>
          <Participant setParticipantRaces={x => setRaces(null, x)}/>
        </div>
      </div>

      <div className="row">
        <div className="column" style={{ textAlign: "center" }}>
          {headToHead()}
          {bothRaced && Object.keys(bothRaced).length ? Object.entries(bothRaced).map(([k, v]) => {
              return (
                <div className="row flex flex-middle" style={{ marginTop: "10px", marginBottom: "10px" }} key={k}>
                  <div
                    style={{
                      backgroundColor: bothRaced[k][0].actualTime < bothRaced[k][1].actualTime ? "darkseagreen" : "lightcoral",
                      fontWeight: "bold",
                      borderRadius: "25px",
                      color: "black",
                    }}
                    className="column">{bothRaced[k][0].actualTime}</div>
                  <div className="column">{bothRaced[k][0].eventName}</div>
                  <div
                    style={{
                      backgroundColor: bothRaced[k][0].actualTime >= bothRaced[k][1].actualTime ? "darkseagreen" : "lightcoral",
                      fontWeight: "bold",
                      borderRadius: "25px",
                      color: "black",
                    }}
                    className="column">{bothRaced[k][1].actualTime}</div>
                </div>
              );
            })
            : bothRaced && p1Races.length && p2Races.length ?
              <div>sorry, no races in common 😥</div>
              : <div/>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
