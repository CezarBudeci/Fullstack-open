import PersonInfo from "./personInfo";

const Persons = ({ search, filteredPersons, persons, handleDelete }) => {
    return (
        <div>
            {
                search !== '' ?
                filteredPersons.map((value) => (
                    <PersonInfo key = {value.id} person = {value} handleDelete = {handleDelete} />
                )) :
                persons && persons.map((value) => (
                    <PersonInfo key = {value.id} person = {value} handleDelete = {handleDelete} />
                ))
            }
        </div>
    )
}

export default Persons;