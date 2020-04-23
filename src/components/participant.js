import React, { useState } from "react";
import AthleteSearch from "./search";
import Grid from "./results-grid";

const Participant = ({ setParticipantRaces }) => {

  let [races, setRaces] = useState([]);
  let [isOpen, setIsOpen] = useState(true);

  const nameClickHandler = async athleteId => {
    setIsOpen(false);
    const response = await fetch("https://results.nyrr.org/api/runners/races", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json;charset=UTF-8",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "token": "6112c32703f442f0",
      },
      "referrer": "https://results.nyrr.org/home",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": JSON.stringify({
        "runnerId": athleteId,
        "searchString": null,
        "year": null,
        "distance": null,
        "pageIndex": 1,
        "pageSize": 100,
        "sortColumn": "EventDate",
        "sortDescending": true,
      }),
      "method": "POST",
      "mode": "cors",
    });
    const rs = await response.json();
    setRaces(rs.response.items);
    setParticipantRaces(rs.response.items);


  };

  return (
    <>
      <AthleteSearch
        onFocusOut={e => setIsOpen(false)}
        onFocusIn={e => setIsOpen(true)}
        onClick={nameClickHandler}
        isOpen={isOpen}
      />


      {/*<Grid races={races}/>*/}
    </>);
};

export default Participant;