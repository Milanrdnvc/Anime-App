const main = document.querySelector('main');
const search = document.querySelector('input');
const searchWrapper = document.querySelector('.search-wrapper');
const headingWrapper = document.querySelector('.heading-wrapper');
const headingSearchWrapper = document.querySelector('.heading-search-wrapper');
const imgGrid = document.querySelector('.anime-image-grid');
const modal = document.querySelector('.modal');
const blurBody = document.querySelector('.blur-body');
const modalClose = document.querySelector('.modal__close-btn');
const modalTitle = document.querySelector('.modal__title');
const modalInfo = document.querySelector('.modal__info ul');
const modalDesc = document.querySelector('.modal__desc');
const modalLink = document.querySelector('.modal__link');
let err;
let anime;

function showModal() {
    modal.classList.add('active');
    blurBody.classList.add('active');
    imgGrid.style.zIndex = '-2';
    searchWrapper.style.zIndex = '-2';
    headingWrapper.style.zIndex = '-2';
}

function hideModal(e) {
    if (e.target.classList[0] !== 'main' && e.target.classList[0] !== 'modal__close-btn' && e.target.classList[0] !== 'heading-search-wrapper') {
        return;
    }
    
    modal.classList.remove('active');
    blurBody.classList.remove('active');
    imgGrid.style.zIndex = '0';  
    searchWrapper.style.zIndex = '0';
    headingWrapper.style.zIndex = '0';
}

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
        img.addEventListener('click', () => {
            showModal();
            modalTitle.innerText = item.title;
            let info = modalInfo.querySelectorAll('li');
            info[0].innerText = `Episodes: ${item.episodes}`;
            info[1].innerText = `Rated: ${item.rated}`;
            info[2].innerText = `Score: ${item.score}`;
            modalDesc.innerText = item.synopsis;
            let readMore = modalLink.querySelector('a');
            readMore.href = item.url;
            readMore.target = '_blank';
        });
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

modalClose.addEventListener('click', hideModal);
main.addEventListener('click', hideModal);




