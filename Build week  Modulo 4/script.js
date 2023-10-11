const API = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
// API per la ricerca dati
const ApiAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"

const riga = document.querySelector('#cont')

//fx per il caricamento dati
async function search(query) {
    const response = await fetch(API + query)
    const data = await response.json()
    return data
}

async function load() {
    const research = "queen"
    const allData = await search(research)
    // console.log(allData.data[0].id)

    riga.innerHTML += allData.data.map((dato) => 
        /*html*/ `
        
        <div class="col-4 mt-2">
        <div class="card">
            <img src="${dato.artist.picture}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${dato.artist.name}</h5>
                <a href="#" class="">Titolo ${dato.title_short}</a>
                <a href="#" class="">Album ${dato.album.title}</a>
                </div>
            </div> 
        </div> 
                   
    `).join("")
    }




window.onload=load()
