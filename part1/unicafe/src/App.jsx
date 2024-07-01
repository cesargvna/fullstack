import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td style={{ width: "60px" }}>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const Statistic = ({ value }) => {
  const { good, neutral, bad } = value;
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={total} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={positive + "%"} />
    </div>
  );
};

const App = () => {
  const [calification, setCalification] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGood = () =>
    setCalification({ ...calification, good: calification.good + 1 });
  const handleNeutral = () =>
    setCalification({ ...calification, neutral: calification.neutral + 1 });
  const handleBad = () =>
    setCalification({ ...calification, bad: calification.bad + 1 });
  let total = calification.good + calification.neutral + calification.bad;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={handleGood} />
      <Button text="Neutral" handleClick={handleNeutral} />
      <Button text="Bad" handleClick={handleBad} />
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistic value={calification} />
      )}
    </div>
  );
};
export default App;
