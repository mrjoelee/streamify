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

  let page = e.target.value;
  // debugger;

  //gets the data attribute that was set from the search input
  const inputValue = selectPage.getAttribute("data-userInput");

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
      pages: "all",
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
      console.log(dataTitle.total_page);
      //clear the movies that were added.
      renderData(dataTitle.result);
    })
    .catch(function (error) {
      console.error(error);
    });
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

async function getNavPage() {
  let page = e.target.value;
  // debugger;

  //gets the data attribute that was set from the search input
  const inputValue = selectPage.getAttribute("data-userInput");

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
        <div class="card__inner">
          <div class="card__face card__face--front">
            <img class="card-img-top" /> 
          </div>
          <div class="card__face card__face--back">
            <div class="card__content">
              <div class="card__header">
                <h5 class="card-title"></h5>
                <a  target="_blank" id="video" href="#"><i class="bi bi-youtube"></i></a> 
              </div>
              <div class="card__body">
                
        
        <p class="card-text"></p>
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

      cardContainer.append(movieCol);

      //toggles the flip method
      const flip = movieCol.querySelector(".card__inner");
      flip.addEventListener("click", function (e) {
        flip.classList.toggle("is-flipped");
        // console.log(e.target);
      });
      // console.log(flip);
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
