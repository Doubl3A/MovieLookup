import React, {useState} from 'react';

import "../css/input.css";
import RadioComponent from "./Components/RadioComponent";
import TextInput from "./Components/TextInputComponent";

const filterTypes :string[] = ["movie", "series", "episode", "all"];
const filterListLength :number[] = [20, 40, 60];

const MovieFilter = (props :any) =>{
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [listLength, setListLength] = useState(20);
    const [hidden, setHidden] = useState(true);

    // saving change in InputYear to type
    const handleTypeChange = (e :any) =>{
        let input = e.target.value;
        if(input === "all"){
            input = "";
        }

        setType(input);
    }

    // saving change in InputYear to year
    const handleYearChange = (e :any) =>{
        setYear(e.target.value);
    }

    // saving change in InputListLength to listLength
    const handleListLengthChange = (e :any) =>{
        setListLength(Number(e.target.value));
    }

    // on submit send filter, using props.updateFilter()
    const handleFilterSubmit = (e :any) =>{
        e.preventDefault();
        const filter = {
            type: type,
            year: year,
            listLength: listLength
        };

        props.updateFilter(filter);
    }

    // hiding/unhiding filter on click
    const toggleFilter = (e :any) =>{
        e.preventDefault();
        setHidden(!hidden);
    }


    let filter :any;
    if(!hidden){
        filter = (
            <div id={"filterInput"}>
                <div className={"filterInputs"}>
                    <RadioComponent items={filterTypes} header={"Search for:"} onChange={handleTypeChange} />
                    <TextInput header={"Year: "} onChange={handleYearChange} />
                    <RadioComponent items={filterListLength} header={"Search results:"} onChange={handleListLengthChange} />
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

export default MovieFilter;