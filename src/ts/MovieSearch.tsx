import React from 'react';

export function MovieSearch(){
    let searchRegex : string = "[A-ZØÆÅa-zøæå]";

    return (
      <div id={"movieSearch"}>
          <h1>Search</h1>
          <input type={"text"} pattern={searchRegex}/>
      </div>
    );
}
