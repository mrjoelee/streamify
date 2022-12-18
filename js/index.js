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
      "X-RapidAPI-Key": "fa0586e4cfmsh7f4e00de64e8f8cp134e8ajsn1a8ff941bcbc",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  axios
    .request(optionsTitle)
    .then(function (response) {
      const dataTitle = response.data;
      console.log(dataTitle);
      //clear the movies that were added.
      clearMovies();
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

  const options = {
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
    .request(options)
    .then(function (response) {
      const dataKeyboard = response.data;
      console.log(dataKeyboard);
      //clear the movies that were added.
      clearMovies();
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
    <a target="_blank" id="stream"> <img class="card-img-top" /> </a>
  
   <div class="card-body d-flex flex-column justify-content-between ">
   <a id="netflix"></a>
   <a target="_blank" id="hulu"> </a>
  
      <h5 class="card-title"></h5>
      <iframe id="video"></iframe>
      <p class="card-text"></p>
      <div>`;

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
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.append(cardCol);
  });
}
