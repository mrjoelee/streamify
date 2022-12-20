"use strict";
document.querySelector(".navbar").insertAdjacentHTML(
  "beforeend",
  `
  <div class="container-fluid">
  <div>
  <a class="navbar-brand" href="./index.html">
  Streamify</a>

  <sup>
    <!-- Light/Dark Theme Toggler -->
    <section>
      <svg
        id="darkMode"
        width="20"
        height="20"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="sun"
          d="M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z"
          fill="#FBD301"
          fill-opacity="0.91"
          padding-right="1rem"
        />
      </svg>
    </section>
  </sup> 
  </div>
    <a class="navbar-brand" href="./about.html">About</a>
  </div>
`
);
