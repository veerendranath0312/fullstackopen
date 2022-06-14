const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('body', req => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];

app.get('/info', (req, res) => {
  const html = `
    <p>Phonebook has info for ${persons.length} people</p>

    <p>${new Date()}</p>
  `;
  res.send(html);
});

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons);
});

app.post('/api/persons', (req, res) => {
  const data = req.body;

  const person = persons.find(
    person => person.name.toLowerCase() === data.name.toLowerCase()
  );

  // checking if both name and number fields are valid
  if (!(data.name && data.number)) {
    return res.status(400).json({
      error: 'Please provide both name and number'
    });
  }

  // checking if the person exists with the provided name
  if (person) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const newPerson = {
    name: data.name,
    number: data.number,
    id: Math.floor(Math.random() * 100000)
  };

  persons = persons.concat(newPerson);
  return res.json(newPerson);
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find(person => person.id === Number(id));

  if (!person) {
    return res.status(404).end();
  }

  res.status(200).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find(person => person.id === Number(id));

  if (!person) {
    return res.status(404).end();
  }

  persons = persons.filter(person => person.id !== Number(id));
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to server at port ${PORT}`);
});
