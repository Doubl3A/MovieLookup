import React, {useEffect, useState} from 'react';
import {Movie} from "./Interface/MovieInterface";
import {sortMovieTable} from "./Components/SortingComponents";
import {MovieTable} from "./Components/TableComponents";
import {getMovieDetails, searchForMovies} from "./Components/SearchComponent";

const defaultMovieID :string[]= [];
const defaultMovies :Movie[] = [];
const defaultSortId :number = 0;

export function MovieList(props :any) {
    const [searchResult, setSearchResult] = useState(defaultMovieID);
    const [movieList, setMovieList] = useState(defaultMovies);

    const [sortId, setSortId] = useState(defaultSortId);
    const [showPlot, setShowPlot] = useState("");

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
            setSortId(0);

            searchForMovies(props.search, props.filter, setSearchResult, setIterations);
        }
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
        //removing plot if its shown
        setShowPlot("");

        const newSort :number = e.target.id;
        if(newSort === sortId){
            setSortId(-newSort);
        }else{
            setSortId(e.target.id);
        }
    }

    function onMovieClick(e :any){
        console.log(e.target);
    }

    let list: any;
    if (isLoaded) {
        const tempMovies :any = sortMovieTable(movieList, sortId);

        list = <MovieTable movies={tempMovies}
                           plotId={showPlot}
                           updateSorting={updateSorting}
                           onMovieClick={onMovieClick}/>

    } else if(!isLoaded && searchResult.length > 0){
        list = <p className={"tempInfo"}>Loading.....</p>

    }

    return (
        <div id={"movieList"} className={"movieTable"}>
            {list}
        </div>
    );
}