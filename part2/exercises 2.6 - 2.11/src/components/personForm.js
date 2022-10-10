const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                name: <input onChange={(e) => {props.handleName(e)}} value = {props.newName} />
            </div>
            <div>
                number: <input onChange={(e) => {props.handleNumber(e)}} value = {props.newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;