const params = new URLSearchParams(window.location.search);
const artId = params.get("artistId")

const ApiArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/"


async function loadArtist() {
    const a = await fetch(ApiArtist + artId)
    const artist = await a.json()
    return artist
}

console.log(loadArtist)