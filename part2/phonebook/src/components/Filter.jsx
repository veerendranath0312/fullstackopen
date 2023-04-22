function Filter(props) {
  return (
    <form className="form-filter">
      <label htmlFor="filter">Filter shown with </label>
      <input
        type="text"
        id="filter"
        name="filter"
        value={props.filterString}
        onChange={props.handleChange}
        placeholder="Search..."
      />
    </form>
  );
}

export default Filter;
