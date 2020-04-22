import React from "react";

const Grid = ({ races }) => {
  return races.map((r, i) => <div style={{ padding: "5px 10px" }}
                                  key={r.eventCode}> {r.eventName} - {r.actualTime} </div>);
};

export default Grid;