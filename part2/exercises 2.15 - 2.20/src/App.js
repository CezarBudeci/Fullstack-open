import './styles/App.css';
import { useEffect, useState } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';
import personService from './services/personService';
import Notification from './components/notification';

const App = () => {
  const [persons, setPersons] = useState(undefined);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = () => {
    personService
    .getAllPersons()
    .then(data => setPersons(data))
    .catch(err => console.log(err));
  }

  const handleName = (e) => {
    setNewName(e.target.value);
  }

  const handleNumber = (e) => {
    setnewNumber(e.target.value);
  }

  const handleSearch = (e) => {
    const searchedValue = e.target.value;
    setSearch(searchedValue);
    if (persons && persons.length !== 0) {
      const filteredList = persons.filter(value => value.name.toLowerCase().includes(searchedValue.trim()));
      setFilteredPersons(filteredList);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName && newName.length !== 0) {
      if (!checkExists(newName)) {
        const newId = persons.length + 1;
        const newPerson = { name: newName.trim(), number: newNumber.trim(), id: newId }
        personService
        .createPerson(newPerson)
        .then((data) => {
          setPersons(persons => [...persons, data]);
          displayMessage(`Added ${data.name}`);
        })
        .catch(err => displayError("Failed to add new person"));
        clearInputs();
        
      } else {
        const existingPerson = persons.filter((person, index) => person.name.toLowerCase().trim() === newName.toLowerCase().trim())[0];
        if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          existingPerson.number = newNumber.trim();
          personService
          .updatePerson(existingPerson)
          .then((data) => {
            const index = persons.findIndex(item => item.name.toLowerCase() === data.name.toLowerCase());
            let personsCopy = [...persons];
            personsCopy[index] = data;
            setPersons(personsCopy);
            displayMessage(`Updated ${data.name}`);
            clearInputs();
          })
          .catch(err => displayError(`Information of ${existingPerson.name} has already been removed from server`));
        }
        
      }
      
    }
  }

  const checkExists = (value) => {
    const exists = persons.filter(person => person.name.toLowerCase().trim() === value.toLowerCase().trim());
    if (exists.length !== 0) {
      return true;
    }
    return false;
  }

  const clearInputs = () => {
    setNewName('');
    setnewNumber('');
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .deletePerson(id)
      .then((res) => {
        setPersons(persons.filter(item => item.id !== id));
        displayMessage(`Removed ${name}`);
      })
      .catch(err => displayError(`Failed to delete ${name}`));
    }
  }

  const displayMessage = (val) => {
    setMessage(val);
    setTimeout(() => {
      setMessage(undefined);
    }, 3000);
  }

  const displayError = (val) => {
    setError(val);
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      {
        message && <Notification type = "MESSAGE" text = {message} />
      }
      {
        error && <Notification type = "ERROR" text = {error} />
      }
      <Filter handleSearch={handleSearch} search = {search} />
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit = {handleSubmit} 
        handleName = {handleName} 
        handleNumber = {handleNumber} 
        newName = {newName} 
        newNumber = {newNumber} 
      />
      <h2>Numbers</h2>
      <Persons
        search = {search}
        filteredPersons = {filteredPersons}
        persons = {persons}
        handleDelete = {handleDelete}
      />
    </div>
  )
}

export default App;