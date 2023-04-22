function PersonForm(props) {
  const { formData, handleChange, addPerson } = props;
  return (
    <form className="form-person" onSubmit={addPerson}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="newName"
          id="name"
          value={formData.newName}
          onChange={handleChange}
          placeholder="Name..."
        />
      </div>
      <div>
        <label htmlFor="number">Number: </label>
        <input
          type="text"
          name="newNumber"
          id="number"
          value={formData.newNumber}
          onChange={handleChange}
          placeholder="Number..."
        />
      </div>
      <button>add</button>
    </form>
  );
}

export default PersonForm;
