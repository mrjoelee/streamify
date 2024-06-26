"use strict";

/*Variables*/

const genreList = {
  1: "Biography",
  2: "Film Noir",
  3: "Game Show",
  4: "Musical",
  5: "Sport",
  6: "Short",
  7: "Adult",
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10763: "News",
  10764: "Reality",
  10767: "Talk Show",
};

const streamImage = {
  prime: `<a target="_blank" class="stream_image" id="prime" title="Amazon, Public domain, via Wikimedia Commons" href="#"><img width="45" alt="Amazon Prime Video logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/512px-Amazon_Prime_Video_logo.svg.png"></a>`,
  disney: `<a target="_blank" class="stream_image" id="disney" title="The Walt Disney Company, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Disney+ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/512px-Disney%2B_logo.svg.png"></a>`,
  netflix: `<a target="_blank" class="stream_image" id="netflix" title="Netflix, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Netflix logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/512px-Netflix_logo.svg.png"></a>`,
  hbo: `<a target="_blank" class="stream_image" id="hbo" title="Warner Bros. Discovery, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="HBO Max Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/512px-HBO_Max_Logo.svg.png"></a>`,
  paramount: `<a target="_blank" class="stream_image" id="paramount" a title="Paramount Global, Public domain, via Wikimedia Commons" href="#"><img width="70" alt="Paramount+ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Paramount%2B_logo.svg/64px-Paramount%2B_logo.svg.png"></a>`,
  hulu: `<a target="_blank" class="stream_image" id="hulu" a title="The Walt Disney Company, NBCUniversal, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Hulu Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/512px-Hulu_Logo.svg.png"></a>`,
  youtube: `<a target="_blank" id="video" title="Original: YouTube Vector:  Jarould, Public domain, via Wikimedia Commons" href="#"><img id= "youtube" width="32" alt="YouTube full-color icon (2017)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/128px-YouTube_full-color_icon_%282017%29.svg.png"></a>`,
};

//Get by Title Movies
document
  .getElementById("search-title")
  .addEventListener("submit", handleAddSubmitTitle);

//Get by related keyboard
document
  .getElementById("search-keyboard")
  .addEventListener("submit", handleAddRelatedMovie);

const selectPage = document.getElementById("navPage");
selectPage.addEventListener("change", displayNewPage);

//paginates to each different pages
async function displayNewPage(e) {
  getNavPage(e);
}

async function handleAddSubmitTitle(event) {
  showTime();
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
      },
    }
  );

  const dataTitle = response.data;
  //fetches the data
  createMoviePoster(dataTitle.result);
}

//Search input by keyboard
async function handleAddRelatedMovie(event) {
  showTime();
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

  createMoviePoster(dataKeyboard.results);

  //maintains the input search since it clears the input after the search is submit
  selectPage.setAttribute("data-userInput", inputValue);

  //will remove pages from new search that have multiple pages
  clearChildrenElement(selectPage);
  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      selectPage.insertAdjacentHTML(
        "beforeend",
        `<option value="${i}">Page ${i}</option>`
      );
    }
    //will show the options (pages)
    selectPage.classList.remove("d-none");
  } else {
    //doesn't show the options (pages)
    selectPage.classList.add("d-none");
  }
}

function createMoviePoster(data) {
  const cardContainer = document.getElementById("cardContainer");

  //removes the first search, when the 2nd search happens
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
        "col-lg-2",
        "col-md-4",
        "col-sm-6",
        "d-flex",
        "justify-content-center",
        "mt-4"
      );

      movieCol.innerHTML = `<div class="card">
        <div class="card__inner" style="position: relative;">
          <div class="card__face card__face--front" style="position: absolute;">
            <img class="card-img-top img-fluid w-100"/> 
            <button button-id=${
              movie.tmdbId || movie.tmdbID
            } type="button" class="favorite btn" style="position: absolute; top: 90%; left: 78%">
                <svg aria-label="Like" class="like" color="#262626" fill="#ECECEC" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                  </path>
                </svg>
                </button>
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
          <div class="movie-info">
          <p id="director"></p>
          <p id="starring"></p>
          <p id="genre">Genres: Drama,Action</p>
          </div>
          <div class="streams">
          
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;

      /* variables for movie properties */
      const url = movie.posterURLs;
      const cast = movie.cast;
      const director = movie.significants;
      const directorT = movie.directors;
      const genre = movie.genres;
      const title = movie.title;
      const text = movie.overview;
      const stream = movie.streamingInfo;
      const streams = movie.streamingInfo.us;
      const video = movie;
      const movieId = movie.tmdbId;
      const posterImage = movieCol.querySelector(".card-img-top");
      const streamDiv = movieCol.querySelector(".streams");

      //checking streamers for movie title search
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

      //checking streamers for related search
      if (stream.hasOwnProperty("us") && streams.hasOwnProperty("netflix")) {
        const netflixT = streams.netflix[0].link;
        streamDiv.innerHTML += `${streamImage.netflix}`;
        movieCol.querySelector("#netflix").setAttribute("href", netflixT);
      }
      if (stream.hasOwnProperty("us") && streams.hasOwnProperty("prime")) {
        const primeT = stream.us.prime[0].link;
        streamDiv.innerHTML += `${streamImage.prime}`;
        movieCol.querySelector("#prime").setAttribute("href", primeT);
      }
      if (stream.hasOwnProperty("us") && streams.hasOwnProperty("disney")) {
        const disneyT = stream.us.disney[0].link;
        streamDiv.innerHTML += `${streamImage.disney}`;
        movieCol.querySelector("#disney").setAttribute("href", disneyT);
      }
      if (stream.hasOwnProperty("us") && streams.hasOwnProperty("hbo")) {
        const hboT = stream.us.hbo[0].link;
        streamDiv.innerHTML += `${streamImage.hbo}`;
        movieCol.querySelector("#hbo").setAttribute("href", hboT);
      }
      if (stream.hasOwnProperty("us") && streams.hasOwnProperty("paramount")) {
        const paramountT = stream.us.paramount[0].link;
        streamDiv.innerHTML += `${streamImage.paramount}`;
        movieCol.querySelector("#paramount").setAttribute("href", paramountT);
      }
      if (stream.hasOwnProperty("us") && streams.hasOwnProperty("hulu")) {
        const huluT = stream.us.hulu[0].link;
        streamDiv.innerHTML += `${streamImage.hulu}`;
        movieCol.querySelector("#hulu").setAttribute("href", huluT);
      }

      //check if the movie has a poster image
      if (url.hasOwnProperty("original")) {
        const posterOne = url.original;
        movieCol.querySelector(".card-img-top").setAttribute("src", posterOne);
      } else if (url.hasOwnProperty("500")) {
        const posterTwo = url["500"];
        posterImage.setAttribute("src", posterTwo);
      } else {
        const invalidImgUrl =
          "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
        posterImage.setAttribute("src", invalidImgUrl);
      }

      //check if the movie has a youtube video
      if (video.hasOwnProperty("youtubeTrailerVideoLink")) {
        const youTube = video.youtubeTrailerVideoLink;
        movieCol.querySelector("#video").setAttribute("href", youTube);
      } else if (video.hasOwnProperty("video")) {
        const keyWordYouTube = `https://www.youtube.com/watch?v=${video.video}`;
        movieCol.querySelector("#video").setAttribute("href", keyWordYouTube);
      }

      movieCol.querySelector(".card-title").textContent = title;
      movieCol.querySelector(".card-text").textContent = text;

      //check if movie has directors, genre, starring
      if (movie.hasOwnProperty("directors")) {
        movieCol.querySelector(
          "#director"
        ).textContent = `Director: ${directorT}`;
      }
      if (movie.hasOwnProperty("significants")) {
        movieCol.querySelector(
          "#director"
        ).textContent = `Director: ${director}`;
      }
      movieCol.querySelector("#starring").textContent = `Starring: ${cast}`;
      if (genre.length >= 3) {
        movieCol.querySelector(
          "#genre"
        ).textContent = `Genre: ${genre[0].name},${genre[1].name},${genre[2].name}`;
      }
      if (!genre[0].hasOwnProperty("id") && genre.length >= 3) {
        movieCol.querySelector("#genre").textContent = `Genre: ${
          genreList[genre[0]]
        },${genreList[genre[1]]},${genreList[genre[2]]}`;
      }

      const favMovie = movieCol.querySelector("[button-id]");
      cardContainer.append(movieCol);

      //toggles the flip method
      const flip = movieCol.querySelector(".card__inner");
      flip.addEventListener("click", function (e) {
        flip.classList.toggle("is-flipped");
      });

      favMovie.addEventListener("click", favoriteMovie);

      function favoriteMovie(e) {
        e.preventDefault();
        e.stopPropagation();
        let btnId = parseInt(favMovie.getAttribute("button-id"));

        //loads the localStorage
        let data = JSON.parse(localStorage.getItem("favorites"));

        //if localStorage is null, then it will create an empty array
        if (!data) {
          data = [];
        }

        //finds for the correct movie via the tmbdId
        const isAlreadyStore = data.find(
          (movie) => movie.tmdbId === btnId || parseInt(movie.tmdbID) === btnId
        );

        //if not store, then it will save it.
        if (!isAlreadyStore) {
          data.push(movie);
          localStorage.setItem("favorites", JSON.stringify(data));
          favMovie.innerHTML = `<div button-id="${
            movie.tmdbId || movie.tmdbID
          } class="_abm0"><span class="_aame"><svg aria-label="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></span></div>`;
        } else {
          //if store, then it will remove it.
          data = data.filter(
            (item) => item.tmdbId !== btnId && parseInt(item.tmdbID) !== btnId
          );
          localStorage.setItem("favorites", JSON.stringify(data));
          favMovie.innerHTML = `<svg aria-label="Like" class="like" color="#262626" fill="#ECECEC" height="24" role="img" viewBox="0 0 24 24" width="24">
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
        </path>
      </svg>`;
        }
      }
    });
  }
}

//removes the element that was created first
function clearChildrenElement(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

//pagination
async function getNavPage(e) {
  let page = e.target.value;

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
  createMoviePoster(dataKeyboard.results);
}

//Get the button
let upBtn = document.getElementById("upBtn");

//when scrolling down, the button will appear
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

//curtain display function
document.body.addEventListener("onload", focus());
function showTime() {
  const curtain = document.getElementById("curtain");
  curtain.className = "open";

  const scene = document.getElementById("scene");
  scene.className = "expand";

  setTimeout(function () {
    scene.style.display = "none";
  }, 3000);
}

function deleteCurtain() {
  setTimeout(function () {
    clearChildrenElement(scene);
  }, 3000);
}
