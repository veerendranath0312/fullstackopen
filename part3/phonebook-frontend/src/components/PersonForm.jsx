const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="name">name: </label>
        <input
          type="text"
          id="name"
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input
          type="text"
          id="number"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
