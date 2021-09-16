import React, {useState} from 'react';

import { MovieSearch } from './MovieSearch';
import { MovieList } from './MovieList';
import { MovieFilter } from './MovieFilter';
import { Filter } from "./Interface/FilterInterface";

const defaultFilter :Filter = {
    type: "",
    year: "",
    listLength: 20
};
const defaultSearch :string = "";

export function MovieLookup(){
    const [filter, setFilter] = useState(defaultFilter);
    const [search, setSearch] = useState(defaultSearch);

    function updateFilter(filter :Filter){
        setFilter(filter);
        console.log(filter);
    }

    function updateSearch(search :string){
        setSearch(search);
        console.log(search);
    }

    return(
        <div id={"MovieLookup"}>
            <MovieFilter updateFilter={updateFilter}/>
            <MovieSearch updateSearch={updateSearch}/>
            <MovieList search={search} filter={filter}/>
        </div>
    );
}


