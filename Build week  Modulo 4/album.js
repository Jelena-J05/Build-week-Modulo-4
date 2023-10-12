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
    <div class="d-flex flex-row pb-4 pt-5 ms-4 text-white">
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
        sectionTracklistRef.innerHTML = /*html*/`
            <div class="container background-section">
                <div class="row text-white-50 border-style mb-2 flex-nowrap">
                    <div class="col-6  mb-2 ms-3"> # TITOLO </div>
                    <div class="col-3 mb-2 d-flex justify-content-center"> RIPRODUZIONI </div>
                    <div class="col-3 mb-2 d-flex justify-content-end"> <i class="bi bi-clock me-4"></i> </div>
                </div>
            <div>
            <ol class="list-group list-group-numbered p-0">
                ${data.tracks.data.map(song => /*html*/`
                    <li class="text-white align-items-center d-flex flex-row list-group-item border border-0">
                     <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-play-fill p-0" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg></span>
                        <div class="col-6 d-flex flex-column justify-content-start">
                         ${song.title} 
                        <div>
                            <img src="${data.artist.picture_small}" class="rounded-circle artist-photo"alt="Immagine dell'artista" style="width:20px; height:20px">
                            <span class="text-white-50">${data.artist.name}</span>
                        </div>
                        </div>
                    <div class="col-3 d-flex justify-content-center text-white-50 pe-0"> ${song.rank.toLocaleString()}</div>
                    <div class="col-3 d-flex justify-content-between text-white-50 pe-4 mx-0">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>
            
                    <span> ${timeStampFromDuration(song.duration)}</span>
                    </div>
                    </li>
                `).join('')}
            </ol>
            </div>
            
        `;
    }
};

