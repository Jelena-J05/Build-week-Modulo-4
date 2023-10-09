const API = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
// API per la ricerca dati

const riga = document.querySelector('id del contenitore corretto nella homepage')

//fx per il caricamento dati
async function search(query) {
    const response = await fetch(API + query)
    const data = await response.json()
    return data
}

window.onload = async function () {
    const research = "queen"
    const allData = await search(research)
    console.log(allData)
    const riga = allData.map((dato) => {
        return /*html*/`
                <div class="col-4 p-1">
                    <img src="${img_find.src.medium}" class="w-100 h-pred mt-1 object-fit-cover" alt="">
                </div>`
    }).join("")
}
