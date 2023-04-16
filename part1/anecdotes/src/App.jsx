import React from "react";
import "./App.css";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // Create an initial votes array with the same length of anecdotes
  // and fill it with zeros: [0, 0, 0, 0, 0, 0, 0, 0]
  const initialVotes = new Array(anecdotes.length).fill(0);

  // State initialization
  const [selected, setSelected] = React.useState(0);
  const [votes, setVotes] = React.useState(initialVotes);

  // Generate random number and update the 'selected' state
  const setRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  // Update the 'votes' array based on the 'selected' state
  const updateVotes = () => {
    setVotes((prevVotes) => {
      const tempVotes = [...prevVotes];
      tempVotes[selected] += 1;
      return tempVotes;
    });
  };

  // Find the maximum value in 'votes' array
  // and the index of maximum value
  const maxVotes = Math.max(...votes);
  const indexOfMaxVote = votes.indexOf(maxVotes);

  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <button onClick={updateVotes}>vote</button>
      <button onClick={setRandomNumber}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexOfMaxVote]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
}

export default App;
