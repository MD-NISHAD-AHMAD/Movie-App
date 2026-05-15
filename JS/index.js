// Default movies shown when page loads
function movie_fetch() {
  fetch("https://www.omdbapi.com/?s=avengers&apikey=6b893790")
    .then((res) => res.json())
    .then((data) => {
      Render_UI(data.Search);
    })
    .catch((err) => console.log(err));
}

// Search movies
function searchMovie() {
  let query = document.getElementById("searchInput").value.trim();

  if (query === "") {
    alert("Please enter movie name");
    return;
  }

  fetch(`https://www.omdbapi.com/?s=${query}&apikey=6b893790`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        document.getElementById("movie").innerHTML =
          "<h2 style='text-align:center;'>No movie found</h2>";
        return;
      }

      Render_UI(data.Search);
    })
    .catch((err) => console.log(err));
}

// Render movie cards
function Render_UI(movies) {
  let mainDiv = document.getElementById("movie");
  mainDiv.innerHTML = "";

  movies.forEach((element) => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card-div";

    let img = document.createElement("img");
    img.src =
      element.Poster !== "N/A"
        ? element.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";

    let title = document.createElement("h3");
    title.innerText = element.Title;

    let type = document.createElement("p");
    type.innerText = "Type: " + element.Type;

    let year = document.createElement("p");
    year.innerText = "Year: " + element.Year;

    cardDiv.append(img, title, type, year);

    // Click event for details
    cardDiv.addEventListener("click", () => {
      getMovieDetails(element.imdbID);
    });

    mainDiv.append(cardDiv);
  });
}

// Fetch full movie details
function getMovieDetails(imdbID) {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=6b893790`)
    .then((res) => res.json())
    .then((data) => {
      showMovieDetails(data);
    })
    .catch((err) => console.log(err));
}

// Show details in modal
function showMovieDetails(movie) {
  const detailsDiv = document.getElementById("movieDetails");

  detailsDiv.innerHTML = `
    <div class="details-container">
      <img src="${
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=No+Image"
      }" alt="${movie.Title}" />

      <div class="details-info">
        <h2>${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Rated:</strong> ${movie.Rated}</p>
        <p><strong>Released:</strong> ${movie.Released}</p>
        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Writer:</strong> ${movie.Writer}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Language:</strong> ${movie.Language}</p>
        <p><strong>Country:</strong> ${movie.Country}</p>
        <p><strong>Awards:</strong> ${movie.Awards}</p>
        <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
      </div>
    </div>
  `;

  document.getElementById("movieModal").style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("movieModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("movieModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Search on Enter key
function handleEnter(event) {
  if (event.key === "Enter") {
    searchMovie();
  }
}