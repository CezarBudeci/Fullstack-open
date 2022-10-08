import PersonInfo from "./personInfo";

const Persons = ({ search, filteredPersons, persons }) => {
    return (
        <div>
            {
                search !== '' ?
                filteredPersons.map((value) => (
                    <PersonInfo key = {value.id} name = {value.name} number = {value.number} />
                )) :
                persons && persons.map((value) => (
                    <PersonInfo key = {value.id} name = {value.name} number = {value.number} />
                ))
            }
        </div>
    )
}

export default Persons;