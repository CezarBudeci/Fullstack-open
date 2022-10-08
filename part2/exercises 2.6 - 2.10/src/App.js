import { useState } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [search, setSearch] = useState('');

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
        setPersons(persons => [...persons, { name: newName.trim(), number: newNumber.trim(), id: persons.length + 1 }]);
        setNewName('');
        setnewNumber('');
      } else {
        alert(`${newName} is already added to phonebook`);
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
  
  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons search={search} filteredPersons = {filteredPersons} persons = {persons} />
    </div>
  )
}

export default App;