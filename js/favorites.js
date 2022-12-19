document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const storedMovies = JSON.parse(localStorage.getItem('favorites'));
    const favoritesArray = [];
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
                  <p class="card-text"></p>
                  <div class="streams">
                  ${streamImage.hulu}
                  ${streamImage.prime}
                  ${streamImage.disney}
                  ${streamImage.netflix}
                  ${streamImage.hbo}
                  ${streamImage.paromount}
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

            // object de-structuring
            // const {posterURLs: {original},title,overview,streamingInfo,video} = movie

            //checks if the stream has a certain services.

            //TODO: implement other streams once we get the icons behind the card
            // if (stream.hasOwnProperty("netflix")) {
            //   const netflix = stream.netflix.us.link;
            //   movieCol.querySelector("#netflix").setAttribute("href", netflix);
            // } else if (stream.hasOwnProperty("hulu")) {
            //   const hulu = stream.hulu.us.link;
            //   movieCol.querySelector("#hulu").setAttribute("href", hulu);
            // }

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
            document.querySelector('#favorites-container').append(movieCol);

            //toggles the flip method
            const flip = movieCol.querySelector(".card__inner");
            flip.addEventListener("click", function (e) {
                flip.classList.toggle("is-flipped");
                // console.log(e.target);
            });
            // console.log(flip);
        });
    }



});