import React, {useState} from 'react';
import {InputType, InputYear, InputListLength} from "./Components/InputComponents";

export function MovieFilter(props :any){
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [listLength, setListLength]= useState(20);

    function handleTypeChange(e :any){
        let input = e.target.value;
        if(input === "all"){
            input = "";
        }

        setType(input);
    }

    function handleYearChange(e :any){
        setYear(e.target.value);
    }

    function handleListLengthChange(e :any){
        setListLength(Number(e.target.value));
    }

    function handleFilterSubmit(e :any){
        e.preventDefault();
        const filter = {
            type: type,
            year: year,
            listLength: listLength
        };

        props.updateFilter(filter);
    }

    return(
        <div id={"movieFilter"}>
            <h1>Filter</h1>
            <InputType onChange={handleTypeChange}/>
            <InputYear onChange={handleYearChange}/>
            <InputListLength onChange={handleListLengthChange}/>
            <button name={"use filters"} onClick={handleFilterSubmit}>use</button>
        </div>
    );
}