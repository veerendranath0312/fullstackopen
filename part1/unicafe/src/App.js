import { useState } from 'react';

const StatisticLine = props => {
  const { name, value } = props;
  return (
    <tr>
      <td>{name} </td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const calcAverage = () => (good - bad) / total;
  const calcPositive = () => `${(100 * good) / total}%`;

  if (total <= 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="all" value={total} />
          <StatisticLine name="average" value={calcAverage()} />
          <StatisticLine name="positive" value={calcPositive()} />
        </tbody>
      </table>
    </div>
  );
};

const Button = props => {
  const { name, changeValue } = props;

  return (
    <div>
      <button onClick={changeValue}>{name}</button>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" changeValue={handleGood} />
      <Button name="neutral" changeValue={handleNeutral} />
      <Button name="bad" changeValue={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
