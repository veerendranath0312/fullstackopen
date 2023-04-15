import React from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

function App() {
  const [good, setGood] = React.useState(0);
  const [neutral, setNeutral] = React.useState(0);
  const [bad, setBad] = React.useState(0);

  const updateGood = () => setGood((prevGood) => prevGood + 1);

  const updateNeutral = () => setNeutral((prevNeutral) => prevNeutral + 1);

  const updateBad = () => setBad((prevBad) => prevBad + 1);

  return (
    <div className="App">
      <h1>give feedback</h1>
      <Button text="good" handleClick={updateGood} />
      <Button text="neutral" handleClick={updateNeutral} />
      <Button text="bad" handleClick={updateBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
