const Total = ({ parts }) => {
  const totalExercisesCount = parts.reduce((sum, acc) => {
    return sum + acc.exercises
  }, 0)

  return (
    <p>
      <b>Number of exercises {totalExercisesCount}</b>
    </p>
  )
}

export default Total
