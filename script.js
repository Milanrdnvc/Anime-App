const imgGrid = document.querySelector('.anime-image-grid');
const search = document.querySelector('input');
let err;

function fetchAnime(url) {
    fetch(url)
        .then(res => res.json())
        .then(renderDOM)
        .catch((err) => {
            renderDOM(null, err);
        });
}

function renderDOM(response, err) {
    if (err) {
        let para = document.createElement('p');
        para.innerText = `Couldn't fetch the data UwU: ${err.message}`;
        imgGrid.appendChild(para);
        return;
    }
    
    response.results.forEach(item => {
        let img = document.createElement('img');
        img.src = item.image_url;
        imgGrid.appendChild(img);
    });
}

let anime;
search.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        if (search.value === '') return;
        imgGrid.querySelectorAll('img').forEach(img => img.remove());
        anime = search.value;
        fetchAnime(`https://api.jikan.moe/v3/search/anime?q=${anime}`);
        search.value = '';
    }
});




