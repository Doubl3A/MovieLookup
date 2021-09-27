import React, {useState} from 'react';

import MovieSearch from './MovieSearch';
import MovieList from './MovieList';
import MovieFilter from './MovieFilter';
import { Filter } from "./Interface/FilterInterface";
import "../css/MovieLookup.css";

const defaultFilter :Filter = {
    type: "",
    year: "",
    listLength: 20
};
const defaultSearch :string = "";

const MovieLookup = () =>{
    const [filter, setFilter] = useState(defaultFilter);
    const [search, setSearch] = useState(defaultSearch);

    function updateFilter(filter :Filter){
        setFilter(filter);
    }

    function updateSearch(search :string){
        setSearch(search);
    }

    return(
        <div id={"MovieLookup"} className={"movieLookup"}>
            <MovieSearch updateSearch={updateSearch}/>
            <MovieFilter updateFilter={updateFilter}/>
            <MovieList search={search} filter={filter}/>
        </div>
    );
}

export default MovieLookup;


