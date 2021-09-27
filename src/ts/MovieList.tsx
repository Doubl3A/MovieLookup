import React, {useEffect, useState} from 'react';
import {Movie} from "./Interface/MovieInterface";
import SortMovieTable from "./Components/SortingComponents";
import CreateMovieTable from "./Components/TableComponents";
import {searchForMovies, getMovieDetails} from "./Components/SearchComponent";

const defaultMovieID: string[] = [];
const defaultMovies: Movie[] = [];
const defaultSortId: number = 1;

const MovieList = (props: any) =>{
    const [searchResult, setSearchResult] = useState(defaultMovieID);
    const [movieList, setMovieList] = useState(defaultMovies);

    const [sortId, setSortId] = useState(defaultSortId);

    const [isLoaded, setIsLoaded] = useState(false);
    const [iterations, setIterations] = useState(0);
    const [error, setError] = useState("");

    // When search or filter updates, get new movie IDs
    // resetting previous values
    useEffect(() => {
        if (props.search !== undefined && props.search !== "") {
            let allowedIterations: number = props.filter.listLength / 10;
            setIterations(allowedIterations);

            setIsLoaded(false);
            setSearchResult([]);
            setMovieList(defaultMovies);
            setSortId(defaultSortId);
            setError("");

            searchForMovies(props.search, props.filter, setSearchResult, setIterations, setError);
        }
    }, [props.search, props.filter]);

    // Gets movie info for each movie
    useEffect(() => {
        if (iterations === 0 && searchResult.length !== 0) {
            getMovieDetails(searchResult, setMovieList);
        }
    }, [searchResult, iterations]);

    // When there is movie's to display, change loaded to true
    useEffect(() => {
        if (movieList.length !== 0) {
            setIsLoaded(true);
        }
    }, [movieList]);

    // When clicking one of the table headers, change sorting for the table
    function updateSorting(e: any) {
        //removing plot if its shown

        const newSort: number = e.target.id;
        if (newSort === sortId) {
            setSortId(-newSort);
        } else {
            setSortId(newSort);
        }
    }

    let list: any;
    if (error !== "") {
        list = <h2 className={"tempInfo"}>{error}</h2>

    } else if (isLoaded) {
        console.log(movieList);
        const tempMovies: any = SortMovieTable(movieList, sortId);

        list = <CreateMovieTable movies={tempMovies} updateSorting={updateSorting}/>
    } else if (!isLoaded && searchResult.length > 0) {
        list = <p className={"tempInfo"}>Loading.....</p>

    }

    return (
        <div id={"movieList"} className={"movieTable"}>
            {list}
        </div>
    );
}

export default MovieList;