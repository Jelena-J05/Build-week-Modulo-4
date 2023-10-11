const params = new URLSearchParams(location.search);
const id = params.get("id");

function timeStampFromDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

async function loadAlbumData() {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Errore durante il caricamento dell'album:", error);
    }
}

const albumTitleRef = document.querySelector('#album-title');
const sectionCoverRef = document.querySelector('section#cover');
const sectionTracklistRef = document.querySelector('section#tracklist');
const sectionBackground = document.querySelector('#background-album');

window.onload = async function () {
    const data = await loadAlbumData();

    if (data) {


        sectionBackground.innerHTML = /*html*/`
    <div class="d-flex flex-row my-4 ms-4">
        <img class="img-fluid" src="${data.cover_medium}" alt="${data.artist.name}" style="width:200px; height:200px">
        <div class="d-flex flex-column justify-content-end ms-3 fw-bold">
            <span class="fs-6 mb-2" > ALBUM </span>
            <span class="fs-1 mb-4">${data.title}</span>
        <div>
            <img src="${data.artist.picture_small}" class="rounded-circle artist-photo"alt="Immagine dell'artista" style="width:40px; height:40px">
            <span>${data.artist.name}</span>
            <span> • <span>
            <span> Anno </span>
            <span> • <span>
            <span> x Brani </span>
            <span class="text-muted"> Durata. </span>
            </div>
        </div>
    </div>
`;
        //inserire l'anno dell'album e la durata dell'album
        // sectionCoverRef.innerHTML = /*html*/`
        //     <img class="img-fluid" src="${data.cover_small}" alt="${data.title}">
        // `;

        sectionTracklistRef.innerHTML = /*html*/`
            <div class="container">
                <div class="row text-muted border-bottom">
                    <div class="col-6 mb-2"> # TITOLO </div>
                    <div class="col-3 mb-2"> RIPRODUZIONI </div>
                    <div class="col-3 mb-2 d-flex justify-content-end"> <i class="bi bi-clock"></i> 
                    </div>
                </div>
            </div>
            <div>
            <ol class="text-dark list-group list-group-numbered">
                ${data.tracks.data.map(song => /*html*/`
                    <li class="text-dark align-items-center d-flex flex-row list-group-item border border-0">
                    <div class="col-6 d-flex flex-column justify-content-start ms-2">
                    ${song.title} 
                    <span class="text-muted">${data.artist.name}</span>
                    </div>
                    <div class="col-3 d-flex justify-content-start"> </div>
                    <div class="col-3 d-flex justify-content-end">${timeStampFromDuration(song.duration)}</div>
                    </li>
                `).join('')}
            </ol>
            
        `;
    }
};


// <img class="img-fluid" src="${data.cover_small}" alt="${data.title}"> 