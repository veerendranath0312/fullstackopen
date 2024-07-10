const Filter = (props) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with: </label>
      <input
        type="text"
        id="filter"
        value={props.filterStr}
        onChange={props.handleFilterStrChange}
      />
    </div>
  )
}

export default Filter
