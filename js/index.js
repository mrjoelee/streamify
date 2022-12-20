"use strict";

// const e = require("express");

const streamImage = {
  prime: `<a target="_blank" class="stream_image" id="prime" title="Amazon, Public domain, via Wikimedia Commons" href="#"><img width="45" alt="Amazon Prime Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/64px-Amazon_Prime_Logo.svg.png"></a>`,
  disney: `<a target="_blank" class="stream_image" id="disney" title="The Walt Disney Company, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Disney+ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/512px-Disney%2B_logo.svg.png"></a>`,
  netflix: `<a target="_blank" class="stream_image" id="netflix" title="Netflix, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Netflix logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/512px-Netflix_logo.svg.png"></a>`,
  hbo: `<a target="_blank" class="stream_image" id="hbo" title="Warner Bros. Discovery, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="HBO Max Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/512px-HBO_Max_Logo.svg.png"></a>`,
  paramount: `<a target="_blank" class="stream_image" id="paramount" a title="Paramount Global, Public domain, via Wikimedia Commons" href="#"><img width="70" alt="Paramount+ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Paramount%2B_logo.svg/64px-Paramount%2B_logo.svg.png"></a>`,
  hulu: `<a target="_blank" class="stream_image" id="hulu" a title="The Walt Disney Company, NBCUniversal, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Hulu Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/512px-Hulu_Logo.svg.png"></a>`,
  youtube: `<a target="_blank" id="video" title="Original: YouTube Vector:  Jarould, Public domain, via Wikimedia Commons" href="#"><img width="32" alt="YouTube full-color icon (2017)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/128px-YouTube_full-color_icon_%282017%29.svg.png"></a>`,
};

const favorites = [];

//Get by Title Movies
document
  .getElementById("search-title")
  .addEventListener("submit", handleAddSubmitTitle);

document
  .getElementById("search-keyboard")
  .addEventListener("submit", handleAddSubmitKeyboard);

const selectPage = document.getElementById("navPage");
selectPage.addEventListener("change", displayNewPage);

async function displayNewPage(e) {
  // console.log(e.target.value);
  getNavPage(e);
}

async function handleAddSubmitTitle(event) {
  event.preventDefault();

  const inputTitle = document.getElementById("title-input").value;
  //clears the forms after it hit searches
  document.getElementById("search-title").reset();
  const response = await axios.get(
    "https://streaming-availability.p.rapidapi.com/v2/search/title",
    {
      headers: {
        "X-RapidAPI-Key": "e3e6e19587msh1f7d7623b368827p128deajsn6a511e58e6a7",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
      params: {
        title: `${inputTitle}`,
        country: "us",
        type: "all",
        output_language: "en",
        pages: "all",
      },
    }
  );

  const dataTitle = response.data;
  console.log(dataTitle);
  //clear the movies that were added.
  renderData(dataTitle.result);
}

//Search input by keyboard

async function handleAddSubmitKeyboard(event) {
  event.preventDefault();
  const inputValue = document.getElementById("keyboard-input").value;
  //clears the forms after it hit searches
  document.getElementById("search-keyboard").reset();

  let totalPages = 0;
  let page = 1;
  // debugger;
  let response = await axios.get(
    "https://streaming-availability.p.rapidapi.com/search/ultra",
    {
      headers: {
        "X-RapidAPI-Key": "56fc230643msh7620609da5ab5a7p15eba2jsn84dde9e32f2d",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
      params: {
        country: "us",
        services: "netflix,hulu,prime,disney,hbo,paramount,apple",
        type: "movie",
        order_by: "imdb_vote_count",
        year_min: "1900",
        year_max: "2022",
        page: "1",
        // genres: "18,80",
        // genres_relation: "or",
        desc: "true",
        // language: "en",
        // min_imdb_rating: "70",
        // max_imdb_rating: "90",
        // min_imdb_vote_count: "10000",
        // max_imdb_vote_count: "1000000",
        keyword: `${inputValue}`,
        // output_language: "en",
      },
    }
  );

  const dataKeyboard = response.data;
  totalPages = dataKeyboard.total_pages;
  renderData(dataKeyboard.results);

  //maintains the input search since it clears the input after the search is submit
  selectPage.setAttribute("data-userInput", inputValue);

  //will remove pages from new search that have multiple pages
  clearChildrenElement(selectPage);
  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      // <option value="1">1</option>

      selectPage.insertAdjacentHTML(
        "beforeend",
        `<option value="${i}">Page ${i}</option>`
      );
    }
    //will show the options
    selectPage.classList.remove("d-none");
  } else {
    //doesn't show the options
    selectPage.classList.add("d-none");
  }
}

//removes the element that was created first
function clearChildrenElement(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

function renderData(data) {
  const cardContainer = document.getElementById("cardContainer");
  clearChildrenElement(cardContainer);
  //if the search is empty, then alert the user
  if (data === null || data.length === 0) {
    cardContainer.innerHTML = `
    <small class="d-flex justify-content-center text-danger">
      Invalid. Please Try Again
    </small>`;
  } else {
    data.forEach((movie) => {
      const movieCol = document.createElement("div");
      movieCol.classList.add(
        "col-lg-3",
        "col-md-4",
        "col-sm-6",
        "d-flex",
        "justify-content-center",
        "mt-4"
      );
      movieCol.innerHTML = `<div class="card">
        <div class="card__inner" style="position: relative;">
          <div class="card__face card__face--front" style="position: absolute;">
            <img class="card-img-top"/> 
            <button type="button" class="favorite btn btn-danger" style="position: absolute; top: 87%; left: 65%">Favorite</button>
          </div>
          <div class="card__face card__face--back" style="position: absolute;">
            <div class="card__content">
            <div class="card__header">
            <h5 class="card-title"></h5>
            ${streamImage.youtube} 
          </div>
          <div class="card__body">
          <div class="card-desc">
    <p class="card-text"></p>
    </div>
    <div class="streams">
    
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

      //movie data for title = result and keyboard = results (variable that is getting from the api).
      // const url = movie.posterURLs.original;
      const url = movie.posterURLs;
      const title = movie.title;
      const text = movie.overview;
      const stream = movie.streamingInfo;
      const video = movie;
      const movieId = movie.tmdbId;
      const posterImage = movieCol.querySelector(".card-img-top");
      const streamDiv = movieCol.querySelector(".streams");

      // object de-structuring
      // const {posterURLs: {original},title,overview,streamingInfo,video} = movie

      //checks if the stream has a certain services.

      // TODO: implement other streams once we get the icons behind the card
      if (stream.hasOwnProperty("netflix")) {
        const netflix = stream.netflix.us.link;
        streamDiv.innerHTML += `${streamImage.netflix}`;
        movieCol.querySelector("#netflix").setAttribute("href", netflix);
      }
      if (stream.hasOwnProperty("prime")) {
        const prime = stream.prime.us.link;
        streamDiv.innerHTML += `${streamImage.prime}`;
        movieCol.querySelector("#prime").setAttribute("href", prime);
      }
      if (stream.hasOwnProperty("disney")) {
        const disney = stream.disney.us.link;
        streamDiv.innerHTML += `${streamImage.disney}`;
        movieCol.querySelector("#disney").setAttribute("href", disney);
      }
      if (stream.hasOwnProperty("hbo")) {
        const hbo = stream.hbo.us.link;
        streamDiv.innerHTML += `${streamImage.hbo}`;
        movieCol.querySelector("#hbo").setAttribute("href", hbo);
      }
      if (stream.hasOwnProperty("paramount")) {
        const paramount = stream.paramount.us.link;
        streamDiv.innerHTML += `${streamImage.paramount}`;
        movieCol.querySelector("#paramount").setAttribute("href", paramount);
      }
      if (stream.hasOwnProperty("hulu")) {
        const hulu = stream.hulu.us.link;
        streamDiv.innerHTML += `${streamImage.hulu}`;
        movieCol.querySelector("#hulu").setAttribute("href", hulu);
      }

      //check if the movie has a poster image
      if (url.hasOwnProperty("original")) {
        const posterOne = url.original;
        movieCol.querySelector(".card-img-top").setAttribute("src", posterOne);
      } else if (url.hasOwnProperty("500")) {
        const posterTwo = url["500"];
        posterImage.setAttribute("src", posterTwo);
      }

      //TODO: how to stop for movies with no youtube link to not refresh.
      if (video.hasOwnProperty("youtubeTrailerVideoLink")) {
        const youTube = video.youtubeTrailerVideoLink;
        movieCol.querySelector("#video").setAttribute("href", youTube);
      }

      movieCol.querySelector(".card-title").textContent = title;
      movieCol.querySelector(".card-text").textContent = text;
      const favMovie = movieCol.querySelector(".favorite");
      favMovie.setAttribute("data-id", `${movieId}`);
      cardContainer.append(movieCol);

      //toggles the flip method
      const flip = movieCol.querySelector(".card__inner");
      flip.addEventListener("click", function (e) {
        flip.classList.toggle("is-flipped");
        // console.log(e.target);
      });
      // console.log(flip);

      favMovie.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let btnId = parseInt(favMovie.getAttribute("data-id"));

        if (btnId === movie.tmdbId) {
          favorites.push(movie);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      });
    });
  }
}

//pagination
async function getNavPage(e) {
  let page = e.target.value;
  // debugger;

  //gets the data attribute that was set from the search input
  const inputValue = selectPage.getAttribute("data-userInput");

  const response = await axios.get(
    "https://streaming-availability.p.rapidapi.com/search/ultra",
    {
      headers: {
        "X-RapidAPI-Key": "56fc230643msh7620609da5ab5a7p15eba2jsn84dde9e32f2d",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
      params: {
        country: "us",
        services: "netflix,hulu,prime,disney,hbo,paramount,apple",
        type: "movie",
        order_by: "imdb_vote_count",
        year_min: "1900",
        year_max: "2022",
        //same variable as page ("above")
        page,
        // genres: "18,80",
        // genres_relation: "or",
        desc: "true",
        // language: "en",
        // min_imdb_rating: "70",
        // max_imdb_rating: "90",
        // min_imdb_vote_count: "10000",
        // max_imdb_vote_count: "1000000",
        keyword: `${inputValue}`,
        // output_language: "en",
      },
    }
  );

  const dataKeyboard = response.data;
  renderData(dataKeyboard.results);
}

//Get the button
let upBtn = document.getElementById("upBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upBtn.style.display = "block";
  } else {
    upBtn.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
upBtn.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function getFavorites() {
  let storedMovies = JSON.parse(localStorage.getItem("favorites"));
  console.log(storedMovies === null);
  if (storedMovies !== null && storedMovies.length !== 0) {
    storedMovies.forEach((storedMovie) => {
      favorites.push(storedMovie);
    });
  } else {
    let emptyArray = [];
    localStorage.setItem("favorites", JSON.stringify(emptyArray));
  }
}
