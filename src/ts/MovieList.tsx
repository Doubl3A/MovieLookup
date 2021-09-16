import React, {useEffect, useState} from 'react';
import {Movie} from "./Interface/MovieInterface";
import {sortMovieTable} from "./Components/SortingComponents";
import {MovieTable} from "./Components/TableComponents";

const apiKey :string = "88fcaf73";
const defaultLink :string = "http://www.omdbapi.com/?apikey=";

const defaultMovieID :string[]= [];
const defaultMovies :Movie[] = [];

export function MovieList(props :any) {
    const [searchResult, setSearchResult] = useState(defaultMovieID);
    const [movieList, setMovieList] = useState(defaultMovies);
    const [sortId, setSortId] = useState(1);

    const [isLoaded, setIsLoaded] = useState(false);
    const [iterations, setIterations] = useState(0);

    useEffect(() => {
        if(props.search !== undefined || props.search !== ""){
            let allowedIterations :number = props.filter.listLength/10;
            setIterations(allowedIterations);

            setIsLoaded(false);
            setSearchResult([]);
            setMovieList([]);
            setSortId(1);

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
                        if(data.Response === "True"){
                            let results :any[] = data.Search;

                            results.forEach( result => {
                                movies.push(result.imdbID);
                            });

                            setSearchResult( prev => prev.concat(movies));
                        }

                        setIterations(prev => prev - 1);
                    });
                i++;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.search, props.filter]);

    //gets movie info for each movie
    useEffect(() => {
        if(iterations === 0 && searchResult.length !== 0){
            let i = 0;
            while(i <= searchResult.length){
                const id :string = searchResult[i];
                const link = defaultLink
                    + apiKey
                    + "&i="+id
                    + "&plot=full";

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
                            boxOffice: result.BoxOffice,
                            plot: result.Plot,
                        };
                        setMovieList( prev => prev.concat(movie));
                });

                i++;
            }
        }
    }, [searchResult, iterations]);

    //when there is movie's to display, change loaded to true
    useEffect(() => {
        if(movieList.length !== 0){
            setIsLoaded(true);
        }
    }, [movieList]);

    //When clicking one of the table headers, change sorting for the table
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
        list = (
            <p>Loading.....</p>
        );
    }else{
        list = (
                <p>Search for a movie</p>
        );
    }

    return (
        <div id={"movieList"}>
            {list}
        </div>
    );
}