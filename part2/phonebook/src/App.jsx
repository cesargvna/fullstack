import { useEffect, useState } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import Person from "./components/Person";

const PersonForm = ({ addPerson, newName, handleInputChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          type="text"
          name="name"
          value={newName.name}
          onChange={handleInputChange}
        />
        <br />
        number:{" "}
        <input
          type="text"
          name="number"
          value={newName.number}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [message, setMessage] = useState({ message: null, type: null });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    let personExists = persons.find((person) => person.name === newPerson.name);
    if (personExists) {
      const confirm = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`,
      );
      if (confirm) {
        const changePerson = { ...personExists, number: newPerson.number };
        personService
          .update(changePerson.id, changePerson)
          .then((personReturned) => {
            setPersons(
              persons.map((person) =>
                person.id !== changePerson.id ? person : personReturned,
              ),
            );

            setNewPerson({ name: "", number: "" });
          })
          .catch((error) => {
            setMessage({
              message: `Information of ${personExists.name} has already been removed from server`,
              type: "error",
            });

            setTimeout(() => {
              setMessage({ message: null, type: null });
            }, 5000);

            setNewPerson({ name: "", number: "" });

            setPersons(
              persons.filter((person) => person.id !== changePerson.id),
            );
          });
      }
    } else {
      personService.create(newPerson).then((personReturned) => {
        setPersons(persons.concat(personReturned));
        setNewPerson({ name: "", number: "" });

        setMessage({
          message: `added ${personReturned.name}`,
          type: "success",
        });

        setTimeout(() => {
          setMessage({ message: null, type: null });
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    window.confirm("Are you sure you want to delete this person?");
    personService.remove(id).then((personRemoved) => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFilter = (event) => {
    const value = event.target.value;
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase()),
    );

    setPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilter={handleFilter} />
      <PersonForm
        addPerson={addPerson}
        newName={newPerson}
        handleInputChange={handleInputChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
