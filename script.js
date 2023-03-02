// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');



// load movies from API
async function loadMovies(search) {
    const URL = `https://omdbapi.com/?s=${search}&page=1&apikey=fc1fef96`;
    const response = await fetch(`${URL}`);
    const data = await response.json();
    // console.log(data);
    if (data.Response == 'True') displayMovieList(data.Search);
}


function findMovies() {
    let search = movieSearchBox.value.trim();
    if (search.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(search);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = '';
    for (let movie of movies) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movie.imdbID;
        movieListItem.classList.add('search-list-item');
        moviePoster = checkPoster(movie);
        movieListItem.innerHTML = `
                        <div class="search-item-thumbnail">
                            <img src="${moviePoster}">
                        </div>
                        <div class="search-item-info">
                            <h3>${movie.Title}</h3>
                            <p>${movie.Year}</p>
                        </div>
                        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96
            `);
            const data = await result.json();
            displayMovieDetails(data);
        })
    });
}

function displayMovieDetails(movie) {
    moviePoster = checkPoster(movie);
    resultGrid.innerHTML = `
                     <div class="movie-poster">
                        <img src="${moviePoster}" alt="movie poster">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">
                            ${movie.Title}
                        </h3>
                        <ul class="movie-misc-info">
                            <li class="year">Year: ${movie.Year}</li>
                            <li class="rated">Ratings: ${movie.Rated}</li>
                            <li class="released">Released: ${movie.Relesed}</li>
                        </ul>
                        <p class="genre"><b>Genre:</b> ${movie.Genre}</p>
                        <p class="writer"><b>Writer:</b> ${movie.Writer}</p>
                        <p class="actors"><b>Actors:</b>${movie.Actors}</p>
                        <p class="plot"><b>Plot:</b> ${movie.Plot}</p>
                        <p class="language"><b>Language:</b> ${movie.Language}</p>
                        <p class="awards"><b><i class="fas fa-award"></i></b>${movie.Awards}</p>
                    </div>
    `;
}

function checkPoster(movie) {
    if (movie.Poster != 'N/A')
        moviePoster = movie.Poster;
    else
        moviePoster = 'image_not_found.png';
    return moviePoster;
}

window.addEventListener('click', e => {
    if (e.target.className != 'form-control') {
        searchList.classList.add('hide-search-list');
    }
})