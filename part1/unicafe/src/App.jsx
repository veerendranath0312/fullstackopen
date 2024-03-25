import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood((prevGood) => prevGood + 1)
  const handleNeutral = () => setNeutral((prevNeutral) => prevNeutral + 1)
  const handleBad = () => setBad((prevBad) => prevBad + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
