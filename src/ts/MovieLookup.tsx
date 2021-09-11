import React from 'react';

import { MovieSearch } from './MovieSearch';
import { MovieList } from './MovieList';
import { MovieFilter } from './MovieFilter';
import { Filter } from "./Interface/FilterInterface";

export function MovieLookup(){
    let search : string = "batman"; //"http://www.omdbapi.com/?apikey=88fcaf73&s=Alien&r=json";
    let filter : Filter = {
        type: "movie",
        year: "",
        listLength: 20
    };

    return(
        <div id={"MovieLookup"}>
            <MovieFilter />
            <MovieSearch />
            <MovieList search={search} filter={filter}/>
        </div>
    );
}