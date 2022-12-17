const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "56fc230643msh7620609da5ab5a7p15eba2jsn84dde9e32f2d",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};

const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", handleAddSubmit);

function handleAddSubmit(event) {
  event.preventDefault();
  //   if (event.key === "Enter") {
  //     searchBtn.click();
  //   }

  const inputValue = document.getElementById("search-input").value;

  const resource = `https://streaming-availability.p.rapidapi.com/search/ultra?country=us&services=netflix%2Chulu&type=movie&order_by=imdb_vote_count&year_min=2000&year_max=2020&page=1&genres=18%2C80&genres_relation=or&desc=true&language=en&${inputValue}&output_language=en`;

  fetch(resource, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.results.length - 1; i++) {
        const cardCol = document.createElement("div");
        cardCol.classList.add(
          "col-lg-3",
          "col-md-4",
          "col-sm-6",
          "d-flex",
          "justify-content-center",
          "m-4"
        );
        cardCol.innerHTML = `<div class="card">
        <a target="_blank" id="stream"> <img class="card-img-top" /> </a>
      
       <div class="card-body d-flex flex-column justify-content-between ">
          <h5 class="card-title"></h5>
          <iframe id="video"></iframe>
          <p class="card-text"></p>
          <div>
      `;

        const url = data.results[i].posterURLs.original;
        const title = data.results[i].title;
        const text = data.results[i].overview;
        // const nfStream = data.results[i].streamingInfo.netflix.us.link;
        // const huluStream = data.results[i].streamingInfo.hulu.us.link;
        const video = data.results[i].video;

        // if (nfStream) {
        //   cardCol.querySelector("#stream").setAttribute("href", nfStream);
        // } else {
        //   cardCol.querySelector("#stream").setAttribute("href", "");
        // }

        // if (huluStream) {
        //   cardCol.querySelector("#stream").setAttribute("href", huluStream);
        // } else {
        //   cardCol.querySelector("#stream").setAttribute("href", "");
        // }

        cardCol.querySelector(".card-title").textContent = title;
        cardCol.querySelector(".card-text").textContent = text;
        cardCol.querySelector(".card-img-top").setAttribute("src", url);
        // cardCol.querySelector("#stream").setAttribute("href", nfStream);
        // cardCol.querySelector("#stream").setAttribute("href", huluStream);
        cardCol
          .querySelector("#video")
          .setAttribute("src", `https://www.youtube.com/embed/${video}`);

        const cardContainer = document.getElementById("cardContainer");
        cardContainer.append(cardCol);
      }
    })
    .catch((err) => console.error(err));
}