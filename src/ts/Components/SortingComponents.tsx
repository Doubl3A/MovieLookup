import {Movie} from "../Interface/MovieInterface";

export function sortMovieTable(movies :Movie[], sortId :number){
    let id :number = sortId;
    if(id !== 0){
        //taking sortId -1 because id start at 1, but array starts at 0
        if(id < 0){
            movies.sort(sortingFunctions[Math.abs(id) - 1]);
            movies.reverse();
        }else{
            movies.sort(sortingFunctions[id -1]);
        }
    }

    return movies;
}

const sortTitle = (a :Movie, b :Movie) => {
    let valid :number = validMovieType(a, b, a.title, b.title);
    if(valid === 0) {
        return a.title.localeCompare(b.title);
    }
    return valid;
};

const sortGenre = (a :Movie, b :Movie) => {
    let valid :number = validMovieType(a, b, a.genre, b.genre);
    if(valid === 0){
        return a.genre.localeCompare(b.genre);
    }
    return valid;
};

const sortRating = (a :Movie, b :Movie) => {
    let valid :number = validMovieType(a, b, a.rating, b.rating);
    if(valid === 0){
        const aR :number = parseFloat(a.rating);
        const bR :number = parseFloat(b.rating);

        if(aR === bR){
            return 0;
        }else if(aR < bR){
            return -1;
        }else{
            return 1;
        }
    }

    return valid;
};

const sortRuntime = (a :Movie, b :Movie) => {
    let valid :number = validMovieType(a, b, a.runtime, b.runtime);
    if(valid === 0){
        const aR :number = parseInt(a.runtime.replace("min", ""));
        const bR :number = parseInt(b.runtime.replace("min", ""));

        if(aR === bR){
            return 0;
        }else if(aR < bR){
            return -1;
        }else{
            return 1;
        }
    }

    return valid
};

const sortLanguage = (a :Movie, b :Movie) => {
    let valid :number = validMovieType(a, b, a.language, b.language);
    if(valid === 0){
        return a.language.localeCompare(b.language);
    }
    return valid;
};

const sortYear = (a :Movie, b :Movie) => {
    let valid :number = validMovieType(a, b, a.year, b.year);
    if(valid === 0){
        return a.year.localeCompare(b.year);
    }
    return valid;
};

const sortBoxOffice = (a :Movie, b :Movie) => {
    let valid :number = validMovieType(a, b, a.boxOffice, b.boxOffice);
    if(valid === 0){
        const aB = a.boxOffice.replace("$", "");
        const bB = b.boxOffice.replace("$", "");

        if(parseInt(aB) === parseInt(bB)){
            return 0;
        }else if(parseInt(aB) < parseInt(bB)){
            return -1;
        }else{
            return 1;
        }
    }

    return valid;
};

const sortingFunctions = [
    sortTitle,
    sortGenre,
    sortRating,
    sortRuntime,
    sortLanguage,
    sortYear,
    sortBoxOffice
];

function validMovieType(a :Movie, b :Movie, aType :string , bType :string){
    let valid = validInput(a,b);
    if(valid === 0){
        valid = nonNA(aType, bType);
    }
    return valid;
}

//checking that a and b isn't undefined
//returning 0 if non are
//1 if a is undefined
//-1 if b is undefined
function validInput(a :any, b :any){
    if(a === undefined || b === undefined){
        if(a === undefined){
            return -1
        }else{
            return 1
        }
    }

    return 0;
}

//checking that a or b is not undefined or "N/A"
//returning 0 if not
//1 if a is "N/A"
//-1 if b is "N/A"
function nonNA(a :string, b :string){
    let valid :number = validInput(a, b);
    if(valid === 0){
        if( a === "N/A" || b === "N/A"){
            if(a === "N/A"){
                return -1;
            }else{
                return 1;
            }
        }
    }

    return valid;
}