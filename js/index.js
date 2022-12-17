const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "56fc230643msh7620609da5ab5a7p15eba2jsn84dde9e32f2d",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};

// const searchBtn = document.getElementById("search");
// searchBtn.addEventListener("submit", handleAddSubmit);

try {
  document
    .getElementById("search-form")
    .addEventListener("submit", handleAddSubmit);

  async function handleAddSubmit(event) {
    event.preventDefault();

    const inputValue = document.getElementById("search-input").value;

    const resource = `https://streaming-availability.p.rapidapi.com/search/ultra?country=us&services=netflix%2Chulu&type=movie&order_by=imdb_vote_count&page=1&genres=18%2C80&genres_relation=or&desc=true&language=en&keyword=${inputValue}&output_language=en`;

    //it's not going to proceed to the next line until it fetches the resource.
    const response = await fetch(resource, options);

    // parsing it to json to JS data.
    const data = await response.json();
    console.log(data);

    const cardContainer = document.getElementById("cardContainer");

    //TODO: maybe needs a try catch

    //clear the movies that were added.
    clearMovies();
    for (let i = 0; i < data.results.length - 1; i++) {
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

      const url = data.results[i].posterURLs.original;
      const title = data.results[i].title;
      const text = data.results[i].overview;
      const stream = data.results[i].streamingInfo;

      if (stream.hasOwnProperty("netflix")) {
        const netflix = stream.netflix.us.link;
        cardCol.querySelector("#netflix").setAttribute("href", netflix);
      } else if (stream.hasOwnProperty("hulu")) {
        const hulu = stream.hulu.us.link;
        cardCol.querySelector("#hulu").setAttribute("href", hulu);
      }

      const video = data.results[i].video;

      cardCol.querySelector(".card-title").textContent = title;
      cardCol.querySelector(".card-text").textContent = text;
      cardCol.querySelector(".card-img-top").setAttribute("src", url);
      cardCol
        .querySelector("#video")
        .setAttribute("src", `https://www.youtube.com/embed/${video}`);

      cardContainer.append(cardCol);
    }
  }
} catch (err) {
  console.error(err);
}

function clearMovies() {
  const cardContainer = document.querySelector("#cardContainer");
  while (cardContainer.firstElementChild) {
    cardContainer.firstElementChild.remove();
  }
}
