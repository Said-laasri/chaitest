const Person = require("./../modul/person");

const people = []; // Array to store the people

const addPerson = (req, res) => {
  const { name, age } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Please enter a name." });
  }

  const newPerson = new Person(name, age);
  people.push(newPerson);

  res.status(200).json({ message: "A person record was added", people });
};

module.exports = {
  addPerson,
};

const getPeople = (req, res) => {
  res.status(200).json(people);
};

const getPersonById = (req, res) => {
  const { id } = req.params;
  const index = parseInt(id);

  if (index >= 0 && index < people.length) {
    res.status(200).json(people[index]);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
};

module.exports = {
  addPerson,
  getPeople,
  getPersonById,
};
