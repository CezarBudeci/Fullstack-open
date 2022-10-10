import { useEffect, useState } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState(undefined);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = () => {
    axios.get('http://localhost:3001/persons')
    .then(res => setPersons(res.data))
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