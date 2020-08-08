const imgGrid = document.querySelector('.anime-image-grid');
const search = document.querySelector('input');
const modal = document.querySelector('.modal');
const blurBody = document.querySelector('.blur-body');
const modalClose = document.querySelector('.modal__close-btn');
let err;
let anime;

search.addEventListener('click', () => {
    modal.classList.add('active');
    blurBody.classList.add('active');
    imgGrid.style.zIndex = '-2';
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    blurBody.classList.remove('active');
    imgGrid.style.zIndex = '0';
});

function fetchAnime(api) {
    fetch(api)
        .then(res => res.json())
        .then(renderDOM)
        .catch((err) => {
            renderDOM(null, err);
        });
}

function renderDOM(response, err) {
    console.log(response.results);
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

search.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        if (search.value === '') return;
        imgGrid.querySelectorAll('img').forEach(img => img.remove());
        anime = search.value;
        fetchAnime(`https://api.jikan.moe/v3/search/anime?q=${anime}`);
        search.value = '';
    }
});




