import React, {useState} from 'react';
import {Movie} from "../Interface/MovieInterface";
import "../../css/tableCss.css";

const CreateMovieTable = (props: any) =>{
    const [showPlot, setShowPlot] = useState("");

    function onMovieClick(key: string) {
        key === showPlot ? setShowPlot("") : setShowPlot(key);
        console.log(showPlot);
    }

    const table: any = props.movies.map((movie: Movie) => {
        return (
            <React.Fragment key={movie.imdbId}>
                <tr key={movie.imdbId} onClick={() => onMovieClick(movie.imdbId)}>
                    <td><img src={movie.poster} alt={"no poster"} className={"poster"}/></td>
                    <td><p>{movie.title}</p></td>
                    <td><p>{movie.genre}</p></td>
                    <td><p>{movie.rating}</p></td>
                    <td><p>{movie.runtime}</p></td>
                    <td><p>{movie.language}</p></td>
                    <td><p>{movie.year}</p></td>
                    <td><p>{movie.boxOffice}</p></td>
                </tr>
                {movie.imdbId === showPlot ?
                    (<tr>
                        <td colSpan={100}>
                            <p className={"pPlot"}>{movie.plot}</p>
                            <img src={movie.poster} alt={"no poster"} className={"plot"}/>
                        </td>
                    </tr>)
                    : null
                }
            </React.Fragment>
        );
    });

    return (
        <table>
            <thead>
            <tr onClick={props.updateSorting}>
                <td>{/*empty*/}</td>
                <td id={"1"}>Title</td>
                <td id={"2"}>Genre</td>
                <td id={"3"}>Rating</td>
                <td id={"4"}>Runtime</td>
                <td id={"5"}>Language</td>
                <td id={"6"}>Year</td>
                <td id={"7"}>BoxOffice</td>
            </tr>
            </thead>
            <tbody>
            {table}
            </tbody>
        </table>
    );
}

export default CreateMovieTable;