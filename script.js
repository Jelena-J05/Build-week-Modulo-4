const API = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

function nRandom() {  //numero a caso tra 1 e 50
  return Math.floor(Math.random() * 100)
}

async function artistaCasuale() { //artista a caso tra 1 e 50
  const a = await fetch(API + nRandom())
  const artistaX = a.json()
  return artistaX
}

async function salva12ArtistiCasuali() {
  const artistiX = []
  for (i = 0; i < 12; i++) {
    try {
      artistiX.push(await artistaCasuale())
    }
    catch {
      console.log("Errore")
      i--
    }
  }
  console.log(artistiX)
  return artistiX
}

function displayArtisti(array12Artisti) {
  resultContainer.innerHTML = array12Artisti.map((artX) => /*html*/ `
  <div class="px-2 col-3 m-1 bg-dark">
  <a href="pagina-artista.html?artistId=${artX.id}">
  <img class="w-100" src="${artX.picture}" alt="" />
  </a>
  <div>
      <!--<h6 class="mt-2 mb-0">$artX.tracklist} </h6>-->
      <p class="m-0 text-white-50">
          <a href="pagina-artista.html?artistId=${artX.id}" style="text-decoration: none; color:white;">
              ${artX.name}
          </a>
      </p>
  </div>
</div>
`)
}

async function caricaArtisti(){
  const X12=await salva12ArtistiCasuali()
  displayArtisti(X12)
}

window.onload = caricaArtisti()




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

function search() {
  if (localStorage.getItem("recentSearches") === null) {
    localStorage.setItem("recentSearches", JSON.stringify([]));
  }

  const search1 = document.querySelector("#colFormLabelSm").value;
  const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
  recentSearches.push(search1)
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  displayRecentSearches();
  const url =
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=` + search;

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
  const recentsearchesContainer = document.querySelector("#recentSearch");
  const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));

  recentsearchesContainer.innerHTML = recentSearches
    .map(
      (searchValue) => /*html*/ `
       <a href="pagina-artista.html?artistId=${searchValue}" style="text-decoration: none;"> <li class="text-white" >${searchValue}</li></a>
       `
    )
    .join("");
}

displayRecentSearches();
