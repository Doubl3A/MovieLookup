import React from "react";

const RadioComponent = (props :any) =>{

    const radio = props.items.map((e :any) =>{
        return(
            <React.Fragment>
            <input type="radio" id={e} value={e} onChange={props.onChange} />
            <label htmlFor={e}>{e}</label>
        </React.Fragment>
        );
    })

    return(
        <div>
            <p>{props.header}</p>
            {radio}
        </div>
    )
}

export default RadioComponent;