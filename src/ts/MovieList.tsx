import React, {useEffect, useState} from 'react';
import {Movie} from "./Interface/MovieInterface";
import {sortMovieTable} from "./Components/SortingComponents";
import {MovieTable} from "./Components/TableComponents";
import {getMovieDetails, searchForMovies} from "./Components/SearchComponent";

const defaultMovieID :string[]= [];
const defaultMovies :Movie[] = [];

export function MovieList(props :any) {
    const [searchResult, setSearchResult] = useState(defaultMovieID);
    const [movieList, setMovieList] = useState(defaultMovies);
    const [sortId, setSortId] = useState(1);

    const [isLoaded, setIsLoaded] = useState(false);
    const [iterations, setIterations] = useState(0);

    // When search or filter updates, get new movie IDs
    // resetting previous values
    useEffect(() => {
        if(props.search !== undefined || props.search !== ""){
            let allowedIterations :number = props.filter.listLength/10;
            setIterations(allowedIterations);

            setIsLoaded(false);
            setSearchResult([]);
            setMovieList([]);
            setSortId(1);

            searchForMovies(props.search, props.filter, setSearchResult, setIterations);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.search, props.filter]);

    // Gets movie info for each movie
    useEffect(() => {
        if(iterations === 0 && searchResult.length !== 0){
            getMovieDetails(searchResult, setMovieList);
        }
    }, [searchResult, iterations]);

    // When there is movie's to display, change loaded to true
    useEffect(() => {
        if(movieList.length !== 0){
            setIsLoaded(true);
        }
    }, [movieList]);

    // When clicking one of the table headers, change sorting for the table
    function updateSorting(e :any){
        const newSort :number = e.target.id;
        if(newSort === sortId){
            setSortId(-newSort);
        }else{
            setSortId(e.target.id);
        }
    }

    let list: any;
    if (isLoaded) {
        const tempMovies :any = sortMovieTable(movieList, sortId);

        list = <MovieTable movies={tempMovies} updateSorting={updateSorting}/>

    } else if(!isLoaded && searchResult.length > 0){
        list = <p>Loading.....</p>

    }else{
        list = <p>Search for a movie</p>

    }

    return (
        <div id={"movieList"}>
            {list}
        </div>
    );
}