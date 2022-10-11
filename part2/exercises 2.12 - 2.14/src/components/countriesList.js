import { useState } from "react";
import CountryInfo from "./countryInfo";

const CountriesList = ({ filteredCountries }) => {
    const [countryToShow, setCountryToShow] = useState(undefined);

    const openCountryInfo = (country) => {
        setCountryToShow(country);
    }

    return (
        <div>
            {
                countryToShow ?
                <CountryInfo country={countryToShow} /> :
                filteredCountries.map((value) => (
                    <p key = {value.name.common}>{value.name.common} <button onClick={() => openCountryInfo(value)}>show</button></p>
                ))
            }
        </div>
        
    )
}

export default CountriesList;