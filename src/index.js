
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
    selectBreeds: document.querySelector('.breed-select'),
    catsInfoCard: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    loaderSpin: document.querySelector('.loader-spin'),
    error: document.querySelector('.error'),
};

function slim() {
  new SlimSelect({
    select: refs.selectBreeds,
    settings: {
      showSearch: false,
      searchText: 'Sorry nothing to see here',
      searchPlaceholder: 'Search for the good stuff!',
      searchHighlight: true,
    },
  });
}

refs.error.classList.add('is-hidden');
refs.catsInfoCard.classList.add('is-hidden');
refs.selectBreeds.classList.add('is-hidden');

refs.selectBreeds.addEventListener('change', onChange);

fetchBreeds()
    .then((data) => {
    const marcup = data.map(({ id, name }) => 
             `<option value="${id}">${name}</option>`
        ).join('');
    refs.selectBreeds.innerHTML = marcup;
     slim();
    refs.selectBreeds.classList.remove('is-hidden');
        refs.loader.classList.replace('loader', 'is-hidden');
        refs.loaderSpin.classList.replace('loader-spin', 'is-hidden');
    })
    .catch(onFetchError);

function onChange(e) {
    refs.loader.classList.replace('is-hidden','loader');
    refs.loaderSpin.classList.replace('is-hidden', 'loader-spin');
    refs.selectBreeds.classList.add('is-hidden');
    refs.catsInfoCard.classList.add('is-hidden');
    const breedId = e.currentTarget;
    fetchCatByBreed(breedId.value).then((data) => {
        refs.loader.classList.replace('loader', 'is-hidden');
        refs.loaderSpin.classList.replace('loader-spin', 'is-hidden');
        refs.selectBreeds.classList.remove('is-hidden');
        const marcup = data.map(el =>
            `<li><img src="${el.url}" alt="${el.breeds[0].name}" width="300"/><h2>${el.breeds[0].name}</h2><p>${el.breeds[0].description}</p><h3>Temperament</h3><p>${el.breeds[0].temperament}</p></li>`
        ).join('');
        refs.catsInfoCard.innerHTML = marcup;
        refs.catsInfoCard.classList.remove('is-hidden');
    })
        .catch(onFetchError);
}

function onFetchError(error) {
    refs.selectBreeds.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');
    refs.loaderSpin.classList.replace('loader-spin', 'is-hidden');
    refs.catsInfoCard.innerHTML = '';

    Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
