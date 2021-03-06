import {Filter} from "../Interface/FilterInterface";
import {Movie} from "../Interface/MovieInterface";

const apiKey :string = "88fcaf73";
const defaultLink :string = "http://www.omdbapi.com/?apikey=";

// retrieves movieIDs from given search and filters
// using setSearchResult to save results
// using setIterations to keep track how many iterations have been tracked
const searchForMovies = (search :string, filter :Filter, setSearchResult :any, setIterations :any, setError :any) =>{
    let allowedIterations :number = filter.listLength/10;

    let i = 1;
    while(i <= allowedIterations){
        let movies :string[] = [];
        const link :string = defaultLink
            + apiKey
            + "&s="+search
            + "&type="+filter.type
            + "&y="+filter.year
            + "&page="+i
            + "&r=json";

        const movieReq = new Request(
            link,
            {method: 'GET'});
        fetch(movieReq)
            .then( res => res.json())
            .then( data => {
                if(data.Response === "True"){
                    let results :any[] = data.Search;

                    results.forEach( result => {
                        movies.push(result.imdbID);
                    });

                    setSearchResult( (prev :any) => prev.concat(movies));
                }else if(data.Error !== "Movie not found!"){
                    setError(data.Error);
                }

                setIterations((prev :any) => prev - 1);
            });
        i++;
    }
}

// retrieves movie details for each movieID
// using setMovieList to save results
const getMovieDetails = (movieIDs :string[], setMovieList :any) =>{
    movieIDs.forEach( movieID =>{
        const link = defaultLink
            + apiKey
            + "&i="+movieID
            + "&plot=full";

        const movieReq = new Request(
            link,
            {method: 'GET'});

        fetch(movieReq)
            .then(response => {
                return response.json();
            }).then((data: any) => {
            let result :any = data;
            const movie :Movie = {
                imdbId: movieID,
                poster: result.Poster,
                title: result.Title,
                genre: result.Genre,
                rating: result.imdbRating,
                runtime: result.Runtime,
                language: result.Language,
                year: result.Year,
                boxOffice: result.BoxOffice,
                plot: result.Plot,
            };
            setMovieList( (prev :any) => prev.concat(movie));
        });
    });
}

export {searchForMovies, getMovieDetails};