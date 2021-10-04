import React from "react";

const TextInput = (props :any) =>{
    return(
        <div>
            <p>{props.header} </p>
            <input type={"text"} onChange={props.onChange}/>
        </div>
    );
}

export default TextInput;