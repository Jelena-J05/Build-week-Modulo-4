const API = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
// API per la ricerca dati
const ApiArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

const params = new URLSearchParams(window.location.search);
let artId = params.get("artistId")

if(!artId){
    artId="queen"
}

console.log(artId)



const riga1 = document.querySelector('#cont1')
const riga2 = document.querySelector('#cont2')

//fx per il caricamento dati
async function search(query) {
    const response = await fetch(API + query)
    const data = await response.json()
    return data
}

async function load(parametro) {
    const research = parametro
    const allData = await search(research)
    // console.log(allData.data[0].id)

    riga1.innerHTML += allData.data.map((dato) =>
        /*html*/ `
        
        <div class="col-4 mx-2">
        <div class="card">
            <img src="${dato.artist.picture}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-truncate">${dato.artist.name}</h5>
                <a href="pagina-artista.html?artId=${dato.artist.id}" class=""><p class="text-truncate">Titolo: ${dato.title_short}</p></a>
                <a href="pagina-album.html?id=${dato.album.id}" class=""><p class="text-truncate">Album: ${dato.album.title}</p></a>
                </div>
            </div> 
        </div> 
                   
    `).join("")

    
    riga2.innerHTML += allData.data.map((dato) =>
    /*html*/`
    
    <div class="col-4 mx-2">
    <div class="card">
        <img src="${dato.artist.picture}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-truncate">${dato.artist.name}</h5>
            <a href="pagina-artista.html?artistId=${dato.artist.id}" class=""><p class="text-truncate">Titolo: ${dato.title_short}</p></a>
            <a href="pagina-album.html?id=${dato.album.id}" class=""><p class="text-truncate">Album: ${dato.album.title}</p></a>
            </div>
        </div> 
    </div> 
               
`).join("")
}




window.onload = load(artId)
