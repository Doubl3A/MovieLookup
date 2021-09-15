import React, {useEffect, useState} from 'react';
import {Movie} from "./Interface/MovieInterface";
import { createMovieTable } from "./Components/TableComponents";
const apiKey :string = "88fcaf73";

//const testLink :string = "http://www.omdbapi.com/?apikey=88fcaf73&s=how%20to%20train%20your%20dragon";
const defaultLink :string = "http://www.omdbapi.com/?apikey=";

const defaultMovieID :string[]= [];
const defaultMovies :Movie[] = [];
const defaultIteration :number = 0;

function getIterations(totalResponse: any, iterations :number) {
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

    return Math.trunc(allowedIterations);
}

export function MovieList(props :any) {
    const [searchResult, setSearchResult] = useState(defaultMovieID);
    const [movieList, setMovieList] = useState(defaultMovies);

    const [isLoaded, setIsLoaded] = useState(false);
    const [iterations, setIterations] = useState(defaultIteration);

    // useEffect( () => {
    //     setIsLoaded(false);
    //     setSearchResult([]);
    //
    //     setIterations(-1)
    // }, [search, filter])

    useEffect(() => {
        if(props.search !== undefined || props.search !== ""){
            console.log(props.search);

            const iteration = props.filter.listLength/10;
            let allowedIterations :number = iteration;
            setIterations(allowedIterations);

            setIsLoaded(false);
            setSearchResult([]);
            setMovieList([]);

            let i = 1;
            while(i <= allowedIterations){
                let movies :string[] = [];
                const link :string = defaultLink
                    + apiKey
                    + "&s="+props.search
                    + "&type="+props.filter.type
                    + "&y="+props.filter.year
                    + "&page="+i
                    + "&r=json";

                const movieReq = new Request(
                    link,
                    {method: 'GET'});
                fetch(movieReq)
                    .then( res => res.json())
                    .then( data => {
                        setIterations(prev => prev - 1);

                        if(data.Response === "True"){
                            let results :any[] = data.Search;

                            results.forEach( result => {
                                movies.push(result.imdbID);
                            });

                            setSearchResult( prev => prev.concat(movies));
                        }else{
                            console.log("jup " + iterations);
                        }
                    });
                i++;
            }
        }
    }, [props.search, props.filter]);

    useEffect(() => {
        if(iterations === 0 && searchResult.length !== 0){
            let movies :Movie[] = [];
            let i = 0;
            while(i <= searchResult.length){
                const id :string = searchResult[i];
                const link = defaultLink
                    + apiKey
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
        }
    }, [searchResult]);

    useEffect(() => {
        setIsLoaded(true)

    }, [movieList]);

    let list: any;
    if (isLoaded) {
        const table :any = movieList.map( (movie :Movie) => {
            return (
                <tr>
                    <td><img src={movie.poster} alt={"no poster"}/></td>
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
                    <thead>
                    <tr>
                        <td>Poster</td><td>Title</td><td>Genre</td><td>Rating</td>
                        <td>Runtime</td><td>Rated</td><td>Year</td><td>BoxOffice</td>
                    </tr>
                    </thead>
                    <tbody>
                    {table}
                    </tbody>
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