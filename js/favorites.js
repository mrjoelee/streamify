"use strict";

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  //loading the local storage
  let storedMovies = JSON.parse(localStorage.getItem("favorites"));

  const streamImage = {
    prime: `<a target="_blank" class="stream_image" id="prime" title="Amazon, Public domain, via Wikimedia Commons" href="#"><img width="45" alt="Amazon Prime Video logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/512px-Amazon_Prime_Video_logo.svg.png"></a>`,
    disney: `<a target="_blank" class="stream_image" id="disney" title="The Walt Disney Company, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Disney+ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/512px-Disney%2B_logo.svg.png"></a>`,
    netflix: `<a target="_blank" class="stream_image" id="netflix" title="Netflix, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Netflix logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/512px-Netflix_logo.svg.png"></a>`,
    hbo: `<a target="_blank" class="stream_image" id="hbo" title="Warner Bros. Discovery, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="HBO Max Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/512px-HBO_Max_Logo.svg.png"></a>`,
    paramount: `<a target="_blank" class="stream_image" id="paramount" a title="Paramount Global, Public domain, via Wikimedia Commons" href="#"><img width="70" alt="Paramount+ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Paramount%2B_logo.svg/64px-Paramount%2B_logo.svg.png"></a>`,
    hulu: `<a target="_blank" class="stream_image" id="hulu" a title="The Walt Disney Company, NBCUniversal, Public domain, via Wikimedia Commons" href="#"><img width="55" alt="Hulu Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/512px-Hulu_Logo.svg.png"></a>`,
    youtube: `<a target="_blank" id="video" title="Original: YouTube Vector:  Jarould, Public domain, via Wikimedia Commons" href="#"><img id= "youtube" width="32" alt="YouTube full-color icon (2017)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/128px-YouTube_full-color_icon_%282017%29.svg.png"></a>`,
  };

  //Genre Categories
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

  //if localStorage is null then empty array
  if (storedMovies === null) {
    storedMovies = [];
  } else {
    storedMovies.forEach((movie) => {
      const movieCol = document.createElement("div");
      movieCol.classList.add(
        "col-lg-3",
        "col-md-4",
        "col-sm-6",
        "d-flex",
        "justify-content-center",
        "mt-4"
      );

      movieCol.innerHTML = `
      <div movie-id="${movie.tmdbId || movie.tmdbID}" class="card">
      <div class="card__inner" style="position: relative;">
      <div class="card__face card__face--front" style="position: absolute;">
        <img class="card-img-top"/> 
        <button button-id=${
          movie.tmdbId || parseInt(movie.tmdbID)
        } type="button" class="favorite btn" style="position: absolute; top: 90%; left: 78%">
            <svg aria-label="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
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

      //variables
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

      // streams properties
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

      // adding stream icons to card * title search

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
      }

      //TODO: how to stop for movies with no youtube link to not refresh.
      if (video.hasOwnProperty("youtubeTrailerVideoLink")) {
        const youTube = video.youtubeTrailerVideoLink;
        movieCol.querySelector("#video").setAttribute("href", youTube);
      } else if (video.hasOwnProperty("video")) {
        const keyWordYouTube = `https://www.youtube.com/watch?v=${video.video}`;
        movieCol.querySelector("#video").setAttribute("href", keyWordYouTube);
      }

      movieCol.querySelector(".card-title").textContent = title;
      movieCol.querySelector(".card-text").textContent = text;
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

      //removes the favorite cards from the favorite page
      favMovie.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let btnId = parseInt(favMovie.getAttribute("button-id"));
        let data = JSON.parse(localStorage.getItem("favorites"));

        if (btnId === movie.tmdbId) {
          data = data.filter((item) => item.tmdbId !== btnId);

          let unfavoriteCard = movieCol.querySelector("[movie-id]");
          unfavoriteCard.remove();
          localStorage.setItem("favorites", JSON.stringify(data));
        } else {
          data = data.filter((item) => parseInt(item.tmdbID) !== btnId);
          let unfavoriteCardKey = movieCol.querySelector("[movie-id]");
          unfavoriteCardKey.remove();
          localStorage.setItem("favorites", JSON.stringify(data));
        }
      });
    });
  }
});
