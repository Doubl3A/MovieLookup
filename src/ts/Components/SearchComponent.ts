import {Filter} from "../Interface/FilterInterface";
import {Movie, MovieID} from "../Interface/MovieInterface";

const defaultLink = "http://www.omdbapi.com/?apikey=88fcaf73";

export function searchForMovies(search :string, filter :Filter){
    const iterations = filter.listLength/10;
    let movies :any[] = [];
    let i = 1;
    while(i <= iterations){
        const page :string= "&page="+i;
        const movieReq = new Request(
            "http://www.omdbapi.com/?apikey=88fcaf73&s=how%20to%20train%20your%20dragon" + page,
            {method: 'GET'});

        fetch(movieReq)
            .then( res => res.json())
            .then( data => {
                let results :any[] = data.Search;

                results.forEach( id => {
                    console.log("id " + id);
                    const movie :MovieID = {
                        imdbID: id.imdbID
                    };
                    movies.push(movie);
                });
                return movies;
            });
        i++;
    }
    return movies;
}

export function getMovieDetails(movieIDs :MovieID[]){
    let movies :Movie[] = [];
    let i = 1;
    while(i <= movieIDs.length){
        const link = defaultLink
            + "&i="+movieIDs[i];

        const movieReq = new Request(
            link,
            {method: 'GET'});

        fetch(movieReq)
            .then(response => {
                return response.json();
            }).then((data: any) => {
            let result :any = data;
            //console.log("nr: " + i + " " +result.Title);
            const movie :Movie = {
                poster: result.Poster,
                title: result.Title,
                genre: result.Genre,
                rating: result.imdbRating,
                runtime: result.Runtime,
                rated: result.Rated,
                year: result.Year,
                boxOffice: result.BoxOffice
            };
            movies.push(movie);

            return movies;
        });

        i++;
    }
    return movies;
}


export function searchAndRespond2(search: string, filter : Filter){
    const iterations :number = filter.listLength / 10;
    let movies :any[] = [];

    let i = 1;
    while(i <= iterations){
        const link = defaultLink
            + "&s="+search
            + "&type="+filter.type
            + "&year="+filter.year;

        const movieReq = new Request(
            link + "&page=" + i,
            {method: 'GET'});

        fetch(movieReq)
            .then(response => {
                return response.json();
            }).then((data: any) => {
            let results :any[] = data.Search;

            let i :number= 0;
            while(i < results.length){
                const result = results[i];
                //console.log("id " + result.imdbID);
                const movieID :MovieID = {
                    imdbID:result.imdbID
                };
                movies.push(movieID);
                i++;
            }
        });

        i++;
    }
    return movies;
}