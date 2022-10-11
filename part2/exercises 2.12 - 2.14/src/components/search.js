const Search = ({ handleInput, search }) => {
    return (
        <div>
            find countries <input onChange={e => handleInput(e.target.value)} value = {search} />
        </div>
    )
}

export default Search;