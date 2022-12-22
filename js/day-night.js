"use strict";

//path (d) value of moon and sun emoji
// the path of sun is morphed to moon and vice versa
const moonPath =
  "M16 27.5C16 42.6878 27.5 52.5 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C27.5 0 16 12.3122 16 27.5Z";
const sunPath =
  "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";

//select svg
const darkMode = document.querySelector("#darkMode");
//const isn't used because we have to change the value to true later
let toggle = false;

// We need to click on the sun
darkMode.addEventListener("click", () => {
  //We need to animate using anime.js
  //Here we set the TIMELINE
  const timeline = anime.timeline({
    duration: 300,
    easing: "easeOutExpo",
  });
  //Add different animations to the timeline
  timeline
    .add({
      targets: ".sun",
      d: [{ value: toggle ? sunPath : moonPath }],
    })
    .add(
      {
        targets: "#darkMode",
        rotate: toggle ? 0 : 320,
      },
      "-= 150"
    ) // -= is used for duration
    .add(
      {
        targets: "body",
        backgroundColor: toggle ? "rgb(255,255,255)" : "rgb(22,22,22)",
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)",
      },
      "-= 150"
    )
    .add(
      {
        targets: [
          "nav",
          "section",
          ".navbar-brand",
          ".card",
          "h2",
          ".icong",
          ".card-title",
          ".card-text",
          ".movie-info",
        ],
        backgroundColor: toggle ? "rgb(108, 117, 125)" : "rgb(108, 117, 125)",
        color: toggle ? "rgb(255,255,255)" : "rgb(22,22,22)",
      },
      "-= 150"
    )
    .add(
      {
        targets: [".card-link", "h4", "#profileCard"],
        backgroundColor: toggle ? "rgb(255,255,255)" : "rgb(22,22,22)",
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)",
      },
      "-= 150"
    );
  //Everytime we click on the sun toggle switches from true to false
  toggle = !toggle;
});
