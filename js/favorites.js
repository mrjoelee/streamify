document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  const storedMovies = JSON.parse(localStorage.getItem('favorites'));
  let favoritesArray = [];
  const streamImage = {
    prime: `<a class="stream_image" id="prime" title="Amazon, Public domain, via Wikimedia Commons" href="#"><img width="64" alt="Amazon Prime Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/64px-Amazon_Prime_Logo.svg.png"></a>`,
    disney: `<a class="stream_image" id="disney" title="The Walt Disney Company, Public domain, via Wikimedia Commons" href="#"><img width="64" alt="Disney+ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/512px-Disney%2B_logo.svg.png"></a>`,
    netflix: `<a class="stream_image" id="netflix" title="Netflix, Public domain, via Wikimedia Commons" href="#"><img width="64" alt="Netflix logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/512px-Netflix_logo.svg.png"></a>`,
    hbo: `<a title="Warner Bros. Discovery, Public domain, via Wikimedia Commons" href="#"><img width="64" alt="HBO Max Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/512px-HBO_Max_Logo.svg.png"></a>`,
    paromount: `<a title="Paramount Global, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Paramount%2B_logo.svg"><img width="64" alt="Paramount+ logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Paramount%2B_logo.svg/64px-Paramount%2B_logo.svg.png"></a>`,
    hulu: `<a title="The Walt Disney Company, NBCUniversal, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Hulu_Logo.svg"><img width="64" alt="Hulu Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/512px-Hulu_Logo.svg.png"></a>`,
    youtube: `<a id="video" title="Original: YouTube Vector:  Jarould, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:YouTube_full-color_icon_(2017).svg" target="_blank"><img width="32" alt="YouTube full-color icon (2017)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/128px-YouTube_full-color_icon_%282017%29.svg.png"></a>`,
  };

  if (storedMovies.length > 0) {
    storedMovies.map(movie => {
      favoritesArray.push(movie);

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
      <div movie-id="${movie.tmdbId}" class="card">
        <div class="card__inner" style="position: relative;">
          <div class="card__face card__face--front" style="position: absolute;">
            <img class="card-img-top"/> 
            <button button-id="${movie.tmdbId}" type="button" class="favorite btn" style="position: absolute; top: 90%; left: 78%">
              <div class="_abm0">
                <span class="_aame">
                  <svg aria-label="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24">
                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
                    </path>
                  </svg>
                </span>
            </div>
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
      const favMovie = movieCol.querySelector('[button-id]');
      document.querySelector('#favorites-container').append(movieCol);

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
        let btnId = parseInt(favMovie.getAttribute('button-id'));

        console.log(favoritesArray);
        console.log(btnId);
        console.log(movie.tmdbId);
        if (btnId === movie.tmdbId) {
          favoritesArray = favoritesArray.filter(item => item.tmdbId !== btnId);
          let unfavoriteCard = movieCol.querySelector('[movie-id]');
          unfavoriteCard.remove();
          localStorage.setItem("favorites", JSON.stringify(favoritesArray));
        }
      }); 
      
      favMovie.addEventListener('click', e => {
        e.preventDefault();
        favMovie.innerHTML =
          `<svg aria-label="Like" class="like" color="#262626" fill="#ECECEC" height="24" role="img" viewBox="0 0 24 24" width="24">
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
        </path>
      </svg>`
      });
    });
  }



});