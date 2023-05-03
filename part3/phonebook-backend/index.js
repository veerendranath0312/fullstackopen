require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db/connect.js");
const Person = require("./models/person.js");

const app = express();

app.use(cors());
app.use(express.json()); // parse incoming json payload
app.use(express.static("dist"));

// Create data token to log the payload
morgan.token("data", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/info", (req, res) => {
  Person.find({}).then((people) => {
    const info = `
      <p>Phonebook has info for ${people.length} people</p>
      <p>${new Date()}</p>
    `;
    res.status(200).send(info);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.status(200).json(people);
  });
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

  // const person = persons.find((person) => person.name === data.name);
  // if (person) {
  //   return res.status(400).json({ error: "name must be unique" });
  // }

  const newPerson = Person({
    name: data.name,
    number: data.number,
  });

  newPerson.save().then((savedPerson) => {
    res.status(201).json(savedPerson);
  });
});

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

start();
