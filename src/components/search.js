import React, { useEffect, useState } from "react";
import useDebounce from "../useDebounce";

const AthleteSelect = ({ onClick, onFocusIn, onFocusOut, isOpen }) => {

  let [results, setResults] = useState([]);
  let [athleteName, setAthleteName] = useState("");

  const debouncedSearchTerm = useDebounce(athleteName, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      optionsAsync(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const optionsAsync = async query => {
    const results = await fetch("https://results.nyrr.org/api/runners/search", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json;charset=UTF-8",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "token": "6112c32703f442f0",
      },
      "referrer": "https://results.nyrr.org/home",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": JSON.stringify({
        "searchString": query,
        "pageIndex": 1,
        "pageSize": 5,
        "sortColumn": null,
        "sortDescending": false,
      }),
      "method": "POST",
      "mode": "cors",
    });

    const r = await results.json();
    setResults(r.response.items);
  };


  return (
    <div style={{ border: "solid 1px", borderRadius: "5px", position: "relative", background: "white", zIndex: "100" }}>
      <input type="text"
             value={athleteName}
             style={{ marginBottom: "0", fontSize: "1.2em", border: "none" }}
             onFocus={onFocusIn}
             onBlur={onFocusOut}
             onChange={e => setAthleteName(e.target.value)}
      />
      <div style={{ position: "absolute", width: "100%", background: "white", marginTop: "5px" }}>
        {isOpen && results.map((r, i) =>
          <div className="box"
               key={i}
               onMouseDown={x => {
                 setAthleteName(`${r.firstName} ${r.lastName}`);
                 onClick(r.runnerId);
               }}>
            {r.firstName} {r.lastName} - ({r.racesCount} races)
          </div>)}
      </div>
    </div>);


};

export default AthleteSelect;
