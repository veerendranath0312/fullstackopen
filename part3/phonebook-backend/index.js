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

app.post("/api/persons", (req, res, next) => {
  const data = req.body;

  const newPerson = Person({
    name: data.name,
    number: data.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ msg: "person not found" });
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const person = {
    name: data.name,
    number: data.number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((savedPerson) => res.status(200).json(savedPerson))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Person.findByIdAndRemove(id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

// This has to be the last middleware
app.use(errorHandler);

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
