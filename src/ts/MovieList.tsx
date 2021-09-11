import React, {useEffect, useState} from 'react';
import {Movie, MovieID} from "./Interface/MovieInterface";
import {Filter} from "./Interface/FilterInterface";
import {getMovieDetails, searchForMovies} from "./Components/SearchComponent";

const defaultLink = "http://www.omdbapi.com/?apikey=88fcaf73";
const defaultSearch :string = "";
const defaultFilter :Filter = {
    type: "",
    year: "",
    listLength: 0
};
const defaultMovieID :string[]= [];
const defaultMovies :Movie[] = [];
const defaultIteration :number = 0;

function getIterations(totalResponse: any, iterations: number) {
    let allowedIterations :number = 1;

    const allowed = totalResponse/10;
    if(allowed < iterations){
        if(allowed < allowed+1){
            allowedIterations = allowed+1;
        }else{
            allowedIterations = allowed;
        }
    }else{
        allowedIterations = iterations
    }

    return allowedIterations;
}

export function MovieList(props :any) {
    const [search, setSearch] = useState(defaultSearch);
    const [filter, setFilter] = useState(defaultFilter);
    const [searchResult, setSearchResult] = useState(defaultMovieID);
    const [movieList, setMovieList] = useState(defaultMovies);

    const [isLoaded, setIsLoaded] = useState(false);
    const [iterations, setIterations] = useState(defaultIteration);

    if (props.search !== search) {
        setSearch(props.search);
    }
    if (props.filter !== filter) {
        setFilter(props.filter);
    }

    useEffect(() => {
        setIsLoaded(false);
        setSearchResult([]);

        const iteration = filter.listLength/10;
        let allowedIterations :number = iteration;

        let i = 1;
        while(i <= allowedIterations){
            let movies :string[] = [];
            const page :string= "&page="+i;
            const movieReq = new Request(
                "http://www.omdbapi.com/?apikey=88fcaf73&s=how%20to%20train%20your%20dragon" + page,
                {method: 'GET'});

            fetch(movieReq)
                .then( res => res.json())
                .then( data => {
                    // if(allowedIterations === 1) {
                    //     allowedIterations = getIterations(data.totalResponse, iterations);
                    //     console.log("Iterations: " + allowedIterations);
                    // }
                    let results :any[] = data.Search;

                    results.forEach( result => {
                        movies.push(result.imdbID);
                    });

                    setSearchResult( prev => prev.concat(movies));
                });
            i++;
        }

    }, [search, filter]);

    useEffect(() => {
        console.log(searchResult);
        //console.log("search: " + searchResult.toString());

        let movies :Movie[] = [];
        let i = 0;
        while(i <= searchResult.length){
            const id :string = searchResult[i];
            const link = defaultLink
                + "&i="+id;

            console.log(id) ;
            const movieReq = new Request(
                link,
                {method: 'GET'});

            fetch(movieReq)
                .then(response => {
                    return response.json();
                }).then((data: any) => {
                let result :any = data;
                //console.log("nr: " + i + " " +result.Title);
                const movie :Movie = {
                    poster: result.Poster,
                    title: result.Title,
                    genre: result.Genre,
                    rating: result.imdbRating,
                    runtime: result.Runtime,
                    rated: result.Rated,
                    year: result.Year,
                    boxOffice: result.BoxOffice
                };
                movies.push(movie);

                setMovieList( prev => prev.concat(movie));
            });

            i++;
        }

    }, [searchResult]);

    useEffect(() => {
        console.log(movieList);
        setIsLoaded(true)

    }, [movieList]);

    let list: any;
    if (isLoaded) {
        const table :any = movieList.map( movie => {
            return (
                <tr>
                    <td><img src={movie.poster}/></td>
                    <td>{movie.title}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.rating}</td>
                    <td>{movie.runtime}</td>
                    <td>{movie.rated}</td>
                    <td>{movie.year}</td>
                    <td>{movie.boxOffice}</td>
                </tr>
            );
        });

        list = (
            <div id={"movieList"}>
                <table>
                    {table}
                </table>
            </div>
        );
    } else {
        list = (
            <div id={"movieList"}>
                <p>Loading.....</p>
            </div>
        );
    }

    return list;
}