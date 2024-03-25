import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  })

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const handleVotes = () => {
    setVotes((prevVotes) => {
      return {
        ...prevVotes,
        [selected]: prevVotes[selected] + 1,
      }
    })
  }

  // This function finds the anecdote with the highest number of votes
  const anecdoteWithMaxVotes = Object.entries(votes).reduce(
    // The reduce fuction takes two arguments: max and curr
    // max is the accumulator, it keeps the anecdotes with the highest votes found so far
    // curr is the current element being processed in the array
    (max, curr) => {
      // If the number of votes of the current anecdote (curr[1]) is greater than the max votes found so far (max[1])
      // then update max to be the current anecdote
      if (curr[1] > max[1]) max = curr
      // Return the anecdote with the highest votes found so far
      return max
    },
    // Initialize the accumulator (max) to be an array with 0 votes
    [0, 0]
  )

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]}</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[anecdoteWithMaxVotes[0]]} has {anecdoteWithMaxVotes[1]}
    </div>
  )
}

export default App
