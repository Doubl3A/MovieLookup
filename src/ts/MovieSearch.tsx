import React, {useState} from 'react';

const searchRegex : string = "[A-ZØÆÅa-zøæå]";
export function MovieSearch(props :any){
    const [search, setSearch] = useState("");

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
          <input type={"text"} pattern={searchRegex} onChange={handleSearchChange}/>
          <button name={"search"} onClick={handleSearchSubmit}>search</button>
      </div>
    );
}
