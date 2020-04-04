import React, { useState } from "react";
import { debounce } from "lodash";

const AthleteSelect = ({ onClick, onFocusIn, onFocusOut, isOpen }) => {

  let [results, setResults] = useState([]);

  const optionsAsync = async query => {
    const results = await fetch("https://results.nyrr.org/api/runners/search", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json;charset=UTF-8",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "token": "6112c32703f442f0"
      },
      "referrer": "https://results.nyrr.org/home",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": JSON.stringify({
        "searchString": query,
        "pageIndex": 1,
        "pageSize": 4,
        "sortColumn": null,
        "sortDescending": false
      }),
      "method": "POST",
      "mode": "cors"
    });

    const r = await results.json();
    setResults(r.response.items);
  };

  let debounced;

  const onChange = e => {

    /* signal to React not to nullify the event object */
    e.persist();

    if (true) {
      if (!debounced) {
        debounced = debounce(() => {
          let searchString = e.target.value;
          optionsAsync(searchString);
        }, 300);
      }
      debounced();
    } else {
      setResults([
        { id: 25695694, label: "Benjamin Toomer" },
        { id: 25695694, label: "Benjamin Coomer" },
        { id: 25695694, label: "Benjamin James" }
      ]);
    }

  };

  return (
    <>
      <input type="text" onFocus={onFocusIn} onMouseDown={onFocusOut} onChange={onChange}/>
      <div>
        {isOpen && results.map((r, i) =>
          <div className="box" key={i}
               onClick={x => onClick(r.runnerId)}>
            {r.firstName} {r.lastName}
          </div>)}
      </div>
    </>);


};

export default AthleteSelect;
