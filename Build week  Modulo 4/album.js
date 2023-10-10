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
const sectionBackground=document.querySelector('#backgound-album');

window.onload = async function () {
    const data = await loadAlbumData();

    if (data) {

        albumTitleRef.innerHTML = data.title;
        sectionBackground.innerHTML=`
        <img class="img-fluid" src="${data.cover_big}" alt="${data.artist.name}"/>
        `;
        sectionCoverRef.innerHTML = /*html*/`
            <img class="img-fluid" src="${data.cover_small}" alt="${data.title}">
        `;

        sectionTracklistRef.innerHTML = /*html*/`
            <ul>
                ${data.tracks.data.map(song => /*html*/`
                    <li class="text-dark">${song.title} ${timeStampFromDuration(song.duration)}</li>
                `).join('')}
            </ul>
        `;
    }
};
