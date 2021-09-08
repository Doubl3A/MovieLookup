import React from 'react';

//Filter inputs
//Radio for selecting movie, series, episodes
export function InputType(){

    return(
        <div>
            <p>Search for:</p>
            <input type="radio" id="movie" name="inputType" value="movie" />
            <label htmlFor="movie">Movie</label>

            <input type="radio" id="series" name="inputType" value="series" />
            <label htmlFor="series">Series</label>

            <input type="radio" id="episode" name="inputType" value="episode" />
            <label htmlFor="episode">Episode</label>

            <input type="radio" id="all" name="inputType" value="all" checked />
            <label htmlFor="all">All</label>
        </div>
    );
}
//txt input for year
export function InputYear(){
    let yearRegex = "^/d{4}$";

    return(
      <div>
          <p>Year: </p>
          <input type={"text"} pattern={yearRegex}/>
      </div>
    );
}


//dropdown list for element amount i table (20-60)
export function InputListLength(){
    return(
        <div>
            <p>Show: </p>
            <input type="radio" id="listLength20" name="inputShow" value="20" checked />
            <label htmlFor="listLength20">20</label>

            <input type="radio" id="listLength40" name="inputShow" value="20" />
            <label htmlFor="listLength40">40</label>

            <input type="radio" id="listLength50" name="inputShow" value="60" />
            <label htmlFor="listLength50">60</label>
        </div>
    );
}
