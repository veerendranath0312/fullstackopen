const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json()); // parse incoming json payload

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;
  res.status(200).send(info);
});

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  const person = persons.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(400).json({ error: "person not found" });
  }

  res.status(200).json({ data: person });
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  persons = persons.filter((person) => person.id !== Number(id));

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const data = req.body;

  if (!data.name || !data.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  const person = persons.find((person) => person.name === data.name);
  if (person) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 100000),
    name: data.name,
    number: data.number,
  };

  persons = [...persons, newPerson];
  res.status(201).json({ data: persons });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
