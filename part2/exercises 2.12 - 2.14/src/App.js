import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/search';
import CountryInfo from './components/countryInfo';
import CountriesList from './components/countriesList';

const App = () => {
  const [countries, setCountries] = useState(undefined);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(res => setCountries(res.data))
    .catch(err => console.error(err));
  }

  const handleInput = (value) => {
    const trimmedValue = value.trim();
    setSearch(trimmedValue);
    try {
      filterCountries(trimmedValue);
    } catch (exception) {
      alert(`${exception}. Please reload the page.`);
    }
    

  }

  const filterCountries = (value) => {
    if (!value || value.lenght === 0) {
      return;
    }

    if (!countries) {
      throw 'Missing countries list';
    }

    const filteredList = countries.filter(item => item.name.common.toLowerCase().includes(value.toLowerCase()));
    setFilteredCountries(filteredList);
  }

  return (
    <div>
      <Search handleInput={handleInput} search = {search} />
      <div>
        {
          filteredCountries.length > 10 ?
          <p>Too many matches, specify another filter</p> :
          (filteredCountries.length === 1 ?
            <CountryInfo country = {filteredCountries[0]} /> :
            <CountriesList filteredCountries={filteredCountries} />
          )
        }
      </div>
    </div>
  )
}

export default App;