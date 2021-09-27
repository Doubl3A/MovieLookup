import React from 'react';

//Filter inputs
//Radio for selecting movie, series, episodes
const InputType = (props :any) =>{

    return(
        <div>
            <p>Search for:</p>
            <input type="radio" id="movie" name="inputType" value="movie" onChange={props.onChange} />
            <label htmlFor="movie">Movie</label>

            <input type="radio" id="series" name="inputType" value="series" onChange={props.onChange} />
            <label htmlFor="series">Series</label>

            <input type="radio" id="episode" name="inputType" value="episode" onChange={props.onChange} />
            <label htmlFor="episode">Episode</label>

            <input type="radio" id="all" name="inputType" value="all" onChange={props.onChange} />
            <label htmlFor="all">All</label>
        </div>
    );
}

//txt input for year
const InputYear = (props :any) =>{
    return(
      <div>
          <p>Year: </p>
          <input type={"text"} onChange={props.onChange}/>
      </div>
    );
}

//dropdown list for element amount i table (20-60)
const InputListLength = (props :any) =>{
    return(
        <div>
            <p>Search results: </p>
            <input type="radio" id="listLength20" name="inputShow" value="20" onChange={props.onChange} />
            <label htmlFor="listLength20">20</label>

            <input type="radio" id="listLength40" name="inputShow" value="40" onChange={props.onChange} />
            <label htmlFor="listLength40">40</label>

            <input type="radio" id="listLength50" name="inputShow" value="60" onChange={props.onChange} />
            <label htmlFor="listLength50">60</label>
        </div>
    );
}

export {InputType, InputYear, InputListLength};