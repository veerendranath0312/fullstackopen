import React from "react";

function App() {
  const [good, setGood] = React.useState(0);
  const [neutral, setNeutral] = React.useState(0);
  const [bad, setBad] = React.useState(0);

  const updateGood = () => setGood((prevGood) => prevGood + 1);

  const updateNeutral = () => setNeutral((prevNeutral) => prevNeutral + 1);

  const updateBad = () => setBad((prevBad) => prevBad + 1);

  const total = good + neutral + bad;
  const average = (good * 1 - bad * 1) / total;
  const positive = (100 * good) / total;

  return (
    <div className="App">
      <h1>give feedback</h1>
      <button onClick={updateGood}>good</button>
      <button onClick={updateNeutral}>neutral</button>
      <button onClick={updateBad}>bad</button>

      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  );
}

export default App;
