import React, { useState } from "react";
import AthleteSearch from "./search";
import Grid from "./results-grid";

const Participant = ({ setParticipantRaces }) => {

  let [races, setRaces] = useState([]);
  let [isOpen, setIsOpen] = useState(true);

  const nameClickHandler = async athleteId => {
    setIsOpen(false);
    if (true) {
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
          "token": "6112c32703f442f0"
        },
        "referrer": "https://results.nyrr.org/home",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": JSON.stringify({
          "runnerId": athleteId,
          "searchString": null,
          "year": null,
          "distance": null,
          "pageIndex": 1,
          "pageSize": 51,
          "sortColumn": "EventDate",
          "sortDescending": true
        }),
        "method": "POST",
        "mode": "cors"
      });
      const rs = await response.json();
      setRaces(rs.response.items);
      setParticipantRaces(rs.response.items);
    } else {
      const r = [{
        "runnerId": "25695694",
        "bib": "613",
        "eventCode": "20WH5K",
        "eventName": "2020 NYRR Washington Heights Salsa, Blues, and Shamrocks 5K",
        "venue": "Washington Heights, NYC (NY12003DK)",
        "distanceName": "5 kilometers",
        "startDateTime": "2020-03-01T09:00:00",
        "actualTime": "0:15:17",
        "actualPace": "04:56"
      }, {
        "runnerId": "25641640",
        "bib": "4210",
        "eventCode": "20GIRON",
        "eventName": "2020 NYRR Gridiron 4M",
        "venue": "Central Park, NY (NY17001DK)",
        "distanceName": "4 miles",
        "startDateTime": "2020-02-02T09:00:00",
        "actualTime": "0:19:55",
        "actualPace": "04:59"
      }, {
        "runnerId": "25081762",
        "bib": "3182",
        "eventCode": "19Midi",
        "eventName": "2019 NYRR Midnight Run",
        "venue": "Central Park, NY (NY15008DK)",
        "distanceName": "4 miles",
        "startDateTime": "2020-01-01T12:00:01",
        "actualTime": "0:19:51",
        "actualPace": "04:58"
      }, {
        "runnerId": "25054225",
        "bib": "3202",
        "eventCode": "19TC15",
        "eventName": "2019 NYRR Ted Corbitt 15K",
        "venue": "Central Park, NYC",
        "distanceName": "15 kilometers",
        "startDateTime": "2019-12-07T08:30:00",
        "actualTime": "0:48:33",
        "actualPace": "05:13"
      }, {
        "runnerId": "25236052",
        "bib": "487",
        "eventCode": "M2019",
        "eventName": "TCS New York City Marathon 2019",
        "venue": "New York City",
        "distanceName": "Marathon",
        "startDateTime": "2019-11-03T08:30:00",
        "actualTime": "2:27:56",
        "actualPace": "05:39"
      }, {
        "runnerId": "25457996",
        "bib": "4291",
        "eventCode": "19SIH",
        "eventName": "2019 NYRR Staten Island Half",
        "venue": "Staten Island, NYC (NY17008DK)",
        "distanceName": "Half-Marathon",
        "startDateTime": "2019-10-13T08:00:00",
        "actualTime": "1:09:02",
        "actualPace": "05:16"
      }, {
        "runnerId": "23119993",
        "bib": "1057",
        "eventCode": "5AV-19",
        "eventName": "2019 New Balance 5th Avenue Mile",
        "venue": "80th Street to 60th Street, Fifth Avenue, NYC",
        "distanceName": "1 mile",
        "startDateTime": "2019-09-08T07:30:00",
        "actualTime": "0:04:22",
        "actualPace": "04:22"
      }, {
        "runnerId": "22646821",
        "bib": "2297",
        "eventCode": "19TEAM5M",
        "eventName": "2019 NYRR Team Championships",
        "venue": "Central Park, NYC",
        "distanceName": "5 miles",
        "startDateTime": "2019-07-27T07:00:00",
        "actualTime": "0:24:45",
        "actualPace": "04:57"
      }, {
        "runnerId": "23096789",
        "bib": "1442",
        "eventCode": "19Q10K",
        "eventName": "2019 NYRR Queens 10K",
        "venue": "Flushing Meadow, NYC",
        "distanceName": "10 kilometers",
        "startDateTime": "2019-06-15T07:45:00",
        "actualTime": "0:30:59",
        "actualPace": "05:00"
      }, {
        "runnerId": "21113952",
        "bib": "2142",
        "eventCode": "19UAE10K",
        "eventName": "2019 UAE Healthy Kidney 10K",
        "venue": "Central Park, NYC",
        "distanceName": "10 kilometers",
        "startDateTime": "2019-04-28T09:00:00",
        "actualTime": "0:30:39",
        "actualPace": "04:56"
      }, {
        "runnerId": "19172840",
        "bib": "8239",
        "eventCode": "18DTF5K",
        "eventName": "2018 Abbott Dash to the Finish Line 5K and USATF 5K Championships",
        "venue": "Central Park, NYC (NY11006DK)",
        "distanceName": "5 kilometers",
        "startDateTime": "2018-11-03T08:30:00",
        "actualTime": "0:14:55",
        "actualPace": "04:49"
      }];

      setRaces(r);
      setParticipantRaces(r);

    }

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