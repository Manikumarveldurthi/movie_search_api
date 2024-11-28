const api = "http://www.omdbapi.com/?i=tt3896198&apikey=be41af31";
const searchbox = document.querySelector(".Search-box");
const button = document.querySelector(".button");
const content = document.querySelector("#content");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");

button.addEventListener('click', setQuery);

function setQuery(evt) {
    getResults(searchbox.value);
}

function getResults(q) {
    // Show loading indicator
    loading.style.display = 'block';
    error.style.display = 'none';
    content.innerHTML = ''; // Clear previous results

    fetch(`${api}&s=${q}`)
        .then(movie => movie.json())
        .then(movie => {
            loading.style.display = 'none'; // Hide loading spinner

            if (movie.Response === "False") {
                // If no results, show error message
                error.style.display = 'block';
            } else {
                movie.Search.forEach((movieItem) => {
                    let box = document.createElement("div");
                    box.setAttribute("class", "box");

                    box.innerHTML = `
                        <div class="poster">
                            <img src="${movieItem.Poster}" alt="${movieItem.Title}">
                        </div>
                        <div class="title">Title: ${movieItem.Title} (${movieItem.Year})</div>
                        <div class="type">Type: ${movieItem.Type}</div>
                        <div class="moreinfo">
                            <a href="https://www.imdb.com/title/${movieItem.imdbID}" target="_blank">More Details</a>
                        </div>
                        <div class="download">
                            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movieItem.Title + " trailer")}" target="_blank">Watch Trailer</a>
                        </div>
                       <div class="download">
    <a href="https://www.netflix.com/search?q=${encodeURIComponent(movieItem.Title)}" target="_blank">Find on Netflix</a>
</div>
<div class="download">
    <a href="https://www.amazon.com/s?k=${encodeURIComponent(movieItem.Title)}" target="_blank">Find on Amazon</a>
</div>

                    `;

                    content.appendChild(box);
                });
            }
        })
        .catch(() => {
            loading.style.display = 'none'; // Hide loading spinner
            error.style.display = 'block'; // Show error message if fetch fails
        });
}
