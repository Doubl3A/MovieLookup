import React from 'react';

import {Filter, MovieFilter} from './MovieFilter';
import { MovieSearch } from './MovieSearch';
import { MovieList } from './MovieList';

export function MovieLookup(){
    let link : string = "http://www.omdbapi.com/?apikey=88fcaf73&s=Alien&r=json";
    let filter : Filter = {
        type: "movie",
        year: "",
        listLength: 20
    };

    return(
        <div id={"MovieLookup"}>
            <MovieFilter />
            <MovieSearch />
            <MovieList link={link} filter={filter}/>
        </div>
    );
}