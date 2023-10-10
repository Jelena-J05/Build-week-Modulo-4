const API = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
// API per la ricerca dati
const ApiAlbum="https://striveschool-api.herokuapp.com/api/deezer/album/"

// const riga = document.querySelector('#cont')

//fx per il caricamento dati
async function search(query) {
    const response = await fetch(API + query)
    const data = await response.json()
    return data
}

async function load() {
    const research = "queen" 
    const allData = await search(research)
    console.log(allData)
    // riga.innerHTML = allData.map((dato) => {
    //     return /*html*/`
    //             <div class="col-6 p-1">
    //                 <img src="${dato.album.cover}" class="w-100 mt-1 object-fit-cover" alt="">
    //             </div>`
    // }).join("")
}
load()