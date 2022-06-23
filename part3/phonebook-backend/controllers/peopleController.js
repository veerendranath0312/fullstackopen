const Person = require('../models/people.js');

const getInfo = async (req, res) => {
  const persons = await Person.find({});

  const html = `
    <p>Phonebook has info for ${persons.length} people</p>

    <p>${new Date()}</p>
  `;
  res.send(html);
};

const getAllPeople = async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
};

const createPerson = async (req, res, next) => {
  try {
    const data = req.body;

    // checking if both name and number fields are valid
    if (!(data.name && data.number)) {
      return res.status(400).json({
        error: 'Please provide both name and number'
      });
    }

    // RegExp pattern
    const pattern = `^${data.name}$`;

    // checking if the person exists with the provided name
    const result = await Person.find({
      name: { $regex: pattern, $options: 'i' }
    });

    // If person found then return the error message
    if (result.length > 0) {
      return res.status(400).json({ error: 'name should be unique' });
    }

    // else create a new person and save to db
    const newPerson = new Person({
      name: data.name,
      number: data.number
    });

    const savedPerson = await newPerson.save();
    return res.json(savedPerson);
  } catch (error) {
    return next(error);
  }
};

const getPersonById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Getting the person based on ID
    const result = await Person.findById(id);

    // If the result is not null send the document
    // else send the error message
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({
        message: `Requested id ${id} not found`
      });
    }
  } catch (error) {
    next(error);
  }
};

const deletePersonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updatePersonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newPerson = {
      name: data.name,
      number: data.number
    };

    const updatedPerson = await Person.findByIdAndUpdate(id, newPerson, {
      new: true,
      runValidators: true,
      context: 'query'
    });

    if (!updatedPerson) {
      return res.status(404).json(`Person not found with id ${id}`);
    }

    res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInfo,
  getAllPeople,
  createPerson,
  getPersonById,
  deletePersonById,
  updatePersonById
};
