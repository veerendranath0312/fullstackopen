function PersonForm(props) {
  const { formData, handleChange, addPerson } = props;
  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">name: </label>
        <input
          type="text"
          name="newName"
          id="name"
          value={formData.newName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input
          type="text"
          name="newNumber"
          id="number"
          value={formData.newNumber}
          onChange={handleChange}
        />
      </div>
      <button>add</button>
    </form>
  );
}

export default PersonForm;
