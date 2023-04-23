function Form(props) {
  return (
    <form>
      <label htmlFor="search-filter">Find countries </label>
      <input
        type="text"
        id="search-filter"
        value={props.value}
        onChange={props.handleChange}
        placeholder="Search..."
      />
    </form>
  );
}

export default Form;
