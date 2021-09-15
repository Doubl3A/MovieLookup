import React from 'react';
import {Movie} from "../Interface/MovieInterface";

export function createMovieTable(props :any){
    const table :any = props.items.map( (movie :Movie) => {
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

    return(
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
}