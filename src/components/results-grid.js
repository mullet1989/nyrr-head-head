import React from "react";

const Grid = ({ races }) => {
  return races.map((r, i) => <div key={r.eventCode}> {r.eventName} - {r.actualTime} </div>);
};

export default Grid;