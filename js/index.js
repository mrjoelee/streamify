//Get by Title Movies
document
  .getElementById("search-title")
  .addEventListener("submit", handleAddSubmitTitle);

document
  .getElementById("search-keyboard")
  .addEventListener("submit", handleAddSubmitKeyboard);

function handleAddSubmitTitle(event) {
  event.preventDefault();

  const inputTitle = document.getElementById("title-input").value;
  //clears the forms after it hit searches
  document.getElementById("search-title").reset();
  const optionsTitle = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/v2/search/title",
    params: {
      title: `${inputTitle}`,
      country: "us",
      type: "all",
      output_language: "en",
    },
    headers: {
      "X-RapidAPI-Key": "e3e6e19587msh1f7d7623b368827p128deajsn6a511e58e6a7",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  axios
    .request(optionsTitle)
    .then(function (response) {
      const dataTitle = response.data;
      console.log(dataTitle);
      //clear the movies that were added.
      renderData(dataTitle.result);
    })
    .catch(function (error) {
      console.error(error);
    });
}

//Search input by keyboard

function handleAddSubmitKeyboard(event) {
  event.preventDefault();
  const inputValue = document.getElementById("keyboard-input").value;
  //clears the forms after it hit searches
  document.getElementById("search-keyboard").reset();

  const optionsKeyboard = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/search/ultra",
    params: {
      country: "us",
      services: "netflix,hulu,prime,disney,hbo,peacock,paramount,apple",
      type: "movie",
      order_by: "imdb_vote_count",
      year_min: "2000",
      year_max: "2020",
      page: "1",
      genres: "18,80",
      genres_relation: "or",
      desc: "true",
      language: "en",
      min_imdb_rating: "70",
      max_imdb_rating: "90",
      min_imdb_vote_count: "10000",
      max_imdb_vote_count: "1000000",
      keyword: `${inputValue}`,
      output_language: "en",
    },
    headers: {
      "X-RapidAPI-Key": "56fc230643msh7620609da5ab5a7p15eba2jsn84dde9e32f2d",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  axios
    .request(optionsKeyboard)
    .then(function (response) {
      const dataKeyboard = response.data;
      console.log(dataKeyboard);
      //clear the movies that were added.
      renderData(dataKeyboard.results);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function clearMovies() {
  const cardContainer = document.querySelector("#cardContainer");
  while (cardContainer.firstElementChild) {
    cardContainer.firstElementChild.remove();
  }
}

function renderData(data) {
  clearMovies();
  const cardContainer = document.getElementById("cardContainer");
  //if the search is empty, then alert the user
  if (data.length === 0) {
    cardContainer.innerHTML = `
    <small class="d-flex justify-content-center text-danger">
      Invalid. Please Try Again
    </small>`;
  } else {
    data.forEach((movie) => {
      const cardCol = document.createElement("div");
      cardCol.classList.add(
        "col-lg-3",
        "col-md-4",
        "col-sm-6",
        "d-flex",
        "justify-content-center",
        "mt-4"
      );
      cardCol.innerHTML = `<div class="card">
        <div class="card__inner">
          <div class="card__face card__face--front">
            <img class="card-img-top" /> 
          </div>
          <div class="card__face card__face--back">
            <div class="card__content">
              <div class="card__header">
                <h5 class="card-title"></h5>
                <i class="bi bi-youtube"></i>
              </div>
              <div class="card__body">
                
        <iframe id="video"></iframe>
        <p class="card-text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;

      //movie data for title = result and keyboard = results (variable that is getting from the api).
      const url = movie.posterURLs.original;
      const title = movie.title;
      const text = movie.overview;
      const stream = movie.streamingInfo;
      const video = movie.video;

      // object de-structuring
      // const {posterURLs: {original},title,overview,streamingInfo,video} = movie

      //checks if the stream has a certain services.
      if (stream.hasOwnProperty("netflix")) {
        const netflix = stream.netflix.us.link;
        cardCol.querySelector("#netflix").setAttribute("href", netflix);
      } else if (stream.hasOwnProperty("hulu")) {
        const hulu = stream.hulu.us.link;
        cardCol.querySelector("#hulu").setAttribute("href", hulu);
      }

      cardCol.querySelector(".card-title").textContent = title;
      cardCol.querySelector(".card-text").textContent = text;
      cardCol.querySelector(".card-img-top").setAttribute("src", url);
      cardCol
        .querySelector("#video")
        .setAttribute("src", `https://www.youtube.com/embed/${video}`);

      cardContainer.append(cardCol);
      //toggles the flip method
      const flip = cardCol.querySelector(".card__inner");
      flip.addEventListener("click", function (e) {
        flip.classList.toggle("is-flipped");
        console.log(e.target);
      });
      console.log(flip);
    });
  }
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
