function Filter(props) {
  return (
    <div>
      <label htmlFor="filter">filter shown with </label>
      <input
        type="text"
        id="filter"
        name="filter"
        value={props.filterString}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default Filter;
