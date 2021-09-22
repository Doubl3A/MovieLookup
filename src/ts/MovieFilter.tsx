import React, {useState} from 'react';
import {InputType, InputYear, InputListLength} from "./Components/InputComponents";
import "../css/input.css";

export function MovieFilter(props :any){
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [listLength, setListLength] = useState(20);
    const [hidden, setHidden] = useState(true);

    // saving change in InputYear to type
    function handleTypeChange(e :any){
        let input = e.target.value;
        if(input === "all"){
            input = "";
        }

        setType(input);
    }

    // saving change in InputYear to year
    function handleYearChange(e :any){
        setYear(e.target.value);
    }

    // saving change in InputListLength to listLength
    function handleListLengthChange(e :any){
        setListLength(Number(e.target.value));
    }

    // on submit send filter, using props.updateFilter()
    function handleFilterSubmit(e :any){
        e.preventDefault();
        const filter = {
            type: type,
            year: year,
            listLength: listLength
        };

        props.updateFilter(filter);
    }

    // hiding/unhiding filter on click
    function toggleFilter(e :any){
        e.preventDefault();
        setHidden(!hidden);
    }


    let filter :any;
    if(!hidden){
        filter = (
            <div id={"filterInput"}>
                <div className={"filterInputs"}>
                    <InputType onChange={handleTypeChange}/>
                    <InputYear onChange={handleYearChange}/>
                    <InputListLength onChange={handleListLengthChange}/>
                </div>
                <div className={"filterSubmit"}>
                    <button onClick={handleFilterSubmit} className={"filterButton"}>use</button>
                </div>
            </div>
        );
    }

   return (
       <div id={"movieFilter"} className={"filter"}>
           <button onClick={toggleFilter} className={"filterButton"}>Filter</button>
           {filter}
       </div>
   );
}