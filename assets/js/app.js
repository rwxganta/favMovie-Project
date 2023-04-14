// Modals
const addMovieModal = document.getElementById("add-movie");
const deleteMovieModal = document.getElementById("delete-movie");
// Open Add New Modal buttom
const addMovieBtn = document.querySelector(".add-modal");
// Add new movie button
const confirmAddMovieBtn = document.querySelector(".btn-add-modal");
// Remove movie button
const confirmRemoveMovieBtn = document.querySelector(".delete-modal");
// close modal buttoms
const closeAddModal = document.querySelector(".close-add-modal");
const closeRemoveModal = document.querySelector(".close-del-modal");
// user inputs
const inputs = document.querySelectorAll("input");

const emptyList = document.querySelector(".empty-msg");
const movieList = document.querySelector(".movie-list");
const movie = document.querySelector(".movie");
const ratioNumber = document.querySelector(".ratio-number");

let movies = [];

// Add new movie buttom EventListener
addMovieBtn.addEventListener("click", () => {
	addMovieModal.showModal();
});

closeAddModal.addEventListener("click", () => {
	addMovieModal.close();
});

closeRemoveModal.addEventListener("click", () => {
	deleteMovieModal.close();
});

inputs[2].addEventListener("input", () => {
	ratioNumber.textContent = inputs[2].value;
});

confirmAddMovieBtn.addEventListener("click", addMovieElememt);

function updateUI() {
	if (movieList.children.length !== 0) {
		emptyList.classList.add("invisible");
		movieList.classList.toggle("invisible");
	}
}

function cleanInputs() {
	for (const input of inputs) {
		input.value = "";
	}
}

function deleteMovie(movieId) {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex += 1;
	}

	movies.splice(movieIndex, 1);
	movieList.children[movieIndex].remove();
	updateUI();
}

function addMovieElememt() {
	const name = inputs[0].value;
	const movieUrl = inputs[1].value;
	const rating = inputs[2].value;

	if (name === "" || movieUrl === "") {
		alert("Please, enter the required values");
		return;
	}

	newMovie = {
		id: Math.random(),
		name: name,
		urlImage: movieUrl,
		rating: rating,
	};

	const newElement = document.createElement("li");
	newElement.classList.add("movie");
	newElement.innerHTML = `
        <div class="movie__image">
            <img src="${movieUrl}" alt="${name}">
        </div>
        <div class="movie__inner">
        <h2 class="movie__title">${name}</h2>
        <p class="movie__rating">rating ${rating}/5</p>
        </div>
        `;
	movies.push(newMovie);
	movieList.append(newElement);
	addMovieModal.close();
	newElement.addEventListener("click", deleteMovie.bind(null, newMovie.id));
	cleanInputs();
	updateUI();
}
