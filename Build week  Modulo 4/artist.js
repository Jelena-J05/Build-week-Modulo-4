const params = new URLSearchParams(window.location.search);
const artId = params.get("artistId")

const ApiArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
//API per cercare l'artista selezionato

async function loadArtist() {
    const a = await fetch(ApiArtist + "") //sostituire il "59" con artId
    const artist = await a.json()
    return artist
}

window.onload = async function(){
    const artistX= await loadArtist()
    console.log(artistX.name)
}