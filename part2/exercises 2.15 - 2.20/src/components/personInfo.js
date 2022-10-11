const PersonInfo = ({ person, handleDelete }) => {
    return (
        <p>{person.name} {person.number} <button onClick = {() => handleDelete(person.name, person.id)}>delete</button></p>
    )
}

export default PersonInfo;