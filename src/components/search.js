import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";

const promiseOptions = inputValue => {
  return new Promise(async resolve => {

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
        "searchString": inputValue,
        "pageIndex": 1,
        "pageSize": 4,
        "sortColumn": null,
        "sortDescending": false
      }),
      "method": "POST",
      "mode": "cors"
    });

    const r = await results.json();
    const b = r.response.items.map(x => {
      return {
        "label": `${x["firstName"]} ${x["lastName"]}`,
        "value": `${x["firstName"]} ${x["lastName"]}`
      };
    });

    resolve(b);

  });
};

export default class AthleteSelect extends Component {

  constructor() {
    super();
  }

  onInputChange(value) {

    // todo : get the athlete events

  }

  render() {
    return (
      <AsyncSelect onChange={this.onInputChange} cacheOptions loadOptions={debounce(promiseOptions, 250)}/>
    );
  }
}
