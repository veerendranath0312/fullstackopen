const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{text === 'positive' ? `${value} %` : `${value}`}</td>
    </tr>
  )
}

export default StatisticsLine
