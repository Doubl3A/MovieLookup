import React, {useState} from 'react';

const MovieSearch = (props :any) =>{
    const [search, setSearch] = useState("");

    function handleSearchChange(e :any){
        setSearch(e.target.value);
    }

    function handleSearchSubmit(e :any){
        e.preventDefault();

        props.updateSearch(search);
    }

    return (
      <div id={"movieSearch"} className={"search"}>
          <h1 className={"inputH1"}>Search</h1>
          <div className={"searchInputDiv"}>
              <input type={"text"} onChange={handleSearchChange} className={"searchInput"}/>
              <button onClick={handleSearchSubmit} className={"searchButton"}>Search</button>
          </div>
      </div>
    );
}

export default MovieSearch;