const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      {props.text === "positive" ? (
        <td> {props.value}%</td>
      ) : (
        <td> {props.value}</td>
      )}
    </tr>
  );
};

export default StatisticLine;
