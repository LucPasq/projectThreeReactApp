const Dropdown = ({handleChange, handleSubmit, userInput}) => {
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="userSearch"></label>
            <select onChange={handleChange} name="amiibo" id="amiibo" value={userInput} required>
                <option>Select Amiibo</option>
                <option value="?id=01010000000e0002">Zelda</option>
                <option value="?id=0000000000000002">Mario</option>
                <option value="?id=0100000000040002">Link</option>
                <option value="?id=05C0000000060002">Samus</option>
                <option value="?id=1F000000000A0002">Kirby</option>
                <option value="?id=3200000000300002">Sonic</option>
                <option value="?id=3340000000320002">Pac-Man</option>
                <option value="?id=2281000002510002">Lucas</option>
                <option value="?id=3DC0000004220002">Steve</option>
                <option value="?id=1919000000090002">Pikachu</option>
            </select>
            <button type="submit">Search</button>
        </form>
    )
}
export default Dropdown;