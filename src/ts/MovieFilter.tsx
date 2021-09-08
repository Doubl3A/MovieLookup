import React from 'react';
import {InputType, InputYear, InputListLength} from "./Components/InputComponents";

export function MovieFilter(){
    return(
        <div id={"movieFilter"}>
            <h1>Filter</h1>
            <InputType />
            <InputYear />
            <InputListLength />
            <button name={"use filters"} onClick={handleFilterInput}>use</button>
        </div>
    );
}

function handleFilterInput(e : any){
    e.preventDefault();


}