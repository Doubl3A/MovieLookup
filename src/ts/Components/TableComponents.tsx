import React from 'react';
import {Movie} from "../Interface/MovieInterface";

export function MovieTable(props :any){
    const table :any = props.movies.map( (movie :Movie) => {
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
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td id={"1"} onClick={props.updateSorting}>Title</td>
                    <td id={"2"} onClick={props.updateSorting}>Genre</td>
                    <td id={"3"} onClick={props.updateSorting}>Rating</td>
                    <td id={"4"} onClick={props.updateSorting}>Runtime</td>
                    <td id={"5"} onClick={props.updateSorting}>Rated</td>
                    <td id={"6"} onClick={props.updateSorting}>Year</td>
                    <td id={"7"} onClick={props.updateSorting}>BoxOffice</td>
                </tr>
            </thead>
            <tbody>
                {table}
            </tbody>
        </table>
    );
}