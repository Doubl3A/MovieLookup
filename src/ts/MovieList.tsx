import React, {useEffect, useState} from 'react';
import {Filter} from "./Interface/FilterInterface";

export function MovieList(props :any){
    const [link, setLink] = useState("");
    const filter : Filter = props.filter;

    console.log("link: " + link);

    useEffect(() => {
        const movieReq = new Request(
            link,
            {method: 'GET'});

        fetch(movieReq)
            .then(response => {
                let resp :any = response.json();
                console.log(resp);
                return resp
            }).then((data: any) => {
        });
    });

    return(
      <div id={"movieList"}>
          <p>
              {}
          </p>
      </div>
    );
}
