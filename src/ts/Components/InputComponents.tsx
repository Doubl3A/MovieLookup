import React from 'react';

//Filter inputs
//Radio for selecting movie, series, episodes
export function InputType(){

    return(
        <div>
            <p>Search for:</p>
            <input type="radio" id="movie" name="inputType" value="movie" onChange={placeHolder} />
            <label htmlFor="movie">Movie</label>

            <input type="radio" id="series" name="inputType" value="series" onChange={placeHolder} />
            <label htmlFor="series">Series</label>

            <input type="radio" id="episode" name="inputType" value="episode" onChange={placeHolder} />
            <label htmlFor="episode">Episode</label>

            <input type="radio" id="all" name="inputType" value="all" onChange={placeHolder} checked />
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
          <input type={"text"} pattern={yearRegex} onChange={placeHolder}/>
      </div>
    );
}


//dropdown list for element amount i table (20-60)
export function InputListLength(){
    return(
        <div>
            <p>Show: </p>
            <input type="radio" id="listLength20" name="inputShow" value="20" onChange={placeHolder} checked />
            <label htmlFor="listLength20">20</label>

            <input type="radio" id="listLength40" name="inputShow" value="20" onChange={placeHolder} />
            <label htmlFor="listLength40">40</label>

            <input type="radio" id="listLength50" name="inputShow" value="60" onChange={placeHolder} />
            <label htmlFor="listLength50">60</label>
        </div>
    );
}

function placeHolder(){
    console.log("placeholder");
}