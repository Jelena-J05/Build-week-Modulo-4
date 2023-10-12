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
const sectionTracklistRef = document.querySelector('#tracklist');
const sectionBackground = document.querySelector('#background-album');

function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes} min ${seconds} sec`;
}

window.onload = async function () {
    const data = await loadAlbumData();

    if (data) {
        const releaseDate = new Date(data.release_date);
        const releaseYear = releaseDate.getFullYear();
        const formattedDuration = formatDuration(data.duration);

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
            <span> ${releaseYear}</span>
            <span> • <span>
            <span> ${data.nb_tracks} brani, </ </span>
            <span class="text-dark-50 fw-normal">${formattedDuration}. </span>
            </div>
        </div>
    </div>
`;
    
        // sectionCoverRef.innerHTML = /*html*/`
        //     <img class="img-fluid" src="${data.cover_small}" alt="${data.title}">
        // `;

        sectionTracklistRef.innerHTML = /*html*/`
            <div class="container background-section">
                <div class="row text-white-50 border-style mb-2">
                    <div class="col-6  mb-2 d-flex justify-content-start"> # TITOLO </div>
                    <div class="col-3 mb-2  d-flex justify-content-center"> RIPRODUZIONI </div>
                    <div class="col-3 mb-2 d-flex justify-content-end"> <i class="bi bi-clock me-4"></i> </div>
                </div>
            <div>
            <ol class="list-group list-group-numbered p-0 w-100">
                ${data.tracks.data.map(song => /*html*/`
                    <li class="text-white align-items-center d-flex flex-row list-group-item list-group-hover border border-0">
                        <div class="col-6 d-flex flex-column justify-content-start ms-3">
                         ${song.title} 
                        <div>
                            <img src="${data.artist.picture_small}" class="rounded-circle artist-photo"alt="Immagine dell'artista" style="width:20px; height:20px">
                            <span class="text-white-50">${data.artist.name}</span>
                        </div>
                        </div>
                    <div class="col-3 d-flex justify-content-center text-white-50 pe-0"> ${song.rank.toLocaleString()}</div>
                    <div class="col-3 d-flex justify-content-end text-white-50 pe-4 mx-0">${timeStampFromDuration(song.duration)}</div>
                    </li>
                `).join('')}
            </ol>
            </div>
            
        `;
    }
};



// <img class="img-fluid" src="${data.cover_small}" alt="${data.title}"> 