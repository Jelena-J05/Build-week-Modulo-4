function showSearchField() {
  const radio = document.querySelector('input[type="radio"]');

  if (radio.checked) {
    document.querySelector("#formSearch").style.display = "block";
  }
}
const searchField = document.querySelector("#btn");
const resultContainer = document.querySelector("#showResearch");
let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let elmSearch = document.querySelector("#colFormLabelSm").value;

function search(query) {
  if (localStorage.getItem("recentSearches") === null) {
    localStorage.setItem("recentSearches", JSON.stringify([]));
  }

  const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  displayRecentSearches();
  const url =
  `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query} `;

  fetch(url)
    .then((r) => r.json())
    .then((body) => {
      resultContainer.innerHTML = body.data
        .map(
          (result) => /*html*/ `
            <div class="px-2 col-sm-6 m-1 ">
            <a href="album.html?id=${result.album.id}">
            <img class="w-50" src="${result.album.cover}" alt="" />
            </a>
            <div>
                <h6 class="mt-2 mb-0">${result.title} </h6>
                <p class="m-0 text-white-50">
                    <a href="artist.html?id=${result.artist.id}">
                        ${result.artist.name}
                    </a>
                </p>
            </div>
        </div>
    `
        )
        .join("");
    });
}

function displayRecentSearches() {
    const recentsearchesContainer = document.querySelector("#recentSearch")
    const recentSearches = JSON.parse(localStorage.getItem("recentSearchs"))

    recentsearchesContainer.innerHTML = recentSearches.map(
        query =>
       /*html*/`
       <li class="text-white" >${query}</li>
       `
        ).join("")
}

// search("muse")
displayRecentSearches()