import React, {useState} from 'react';

export function MovieSearch(props :any){
    //TODO - set initial state to ""
    const [search, setSearch] = useState("batman");

    function handleSearchChange(e :any){
        setSearch(e.target.value);
    }

    function handleSearchSubmit(e :any){
        e.preventDefault();

        props.updateSearch(search);
    }

    return (
      <div id={"movieSearch"}>
          <h1>Search</h1>
          <input type={"text"} onChange={handleSearchChange}/>
          <button name={"search"} onClick={handleSearchSubmit}>search</button>
      </div>
    );
}
