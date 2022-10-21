const Filter = ({ handleSearch, search }) => {
    return (
        <div>
            filter shown with <input onChange={(e) => {handleSearch(e)}} value = {search} />
        </div>
    )
}

export default Filter;