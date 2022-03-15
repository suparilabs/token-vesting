import React, { useState } from "react";

export default function Sample() {
  const [arr, setArr] = useState(["foo"]);
  return (
    <div className="App">
        <h1>Hello..............</h1>
      <button onClick={() => setArr((oldArray) => [...oldArray, "ooffo"])}>
        add
      </button>
      <div>
        {arr.map((a, i) => (
          <p key={i}>{a}</p>
        ))}
      </div>
    </div>
  );
}