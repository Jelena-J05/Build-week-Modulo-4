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
const sectionBackground=document.querySelector('#background-album');

window.onload = async function () {
    const data = await loadAlbumData();

    if (data) {

        albumTitleRef.innerHTML = data.title;
        sectionBackground.innerHTML= /*html*/`
        <img class="img-fluid" src="${data.cover}" alt="${data.artist.name}">
        `;
        // sectionCoverRef.innerHTML = /*html*/`
        //     <img class="img-fluid" src="${data.cover_small}" alt="${data.title}">
        // `;

        sectionTracklistRef.innerHTML = /*html*/`
            <ol class="text-dark w-100">
                ${data.tracks.data.map(song => /*html*/`
                    <li class="text-dark d-flex justify-content-between align-items-center">
                    <img class="img-fluid" src="${data.cover_small}" alt="${data.title}">
                    <span>${song.title} </span>
                    <span>${timeStampFromDuration(song.duration)}</span>
                    </li>
                `).join('')}
            </ol>
        `;
    }
};
