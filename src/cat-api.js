import axios from "axios";
axios.defaults.headers.common['x-api-key'] = 'live_DcOEZMnwiegKnZ3xIcbaezuW4JFW32nBIXbZTVLZ0xNcDkcpWK2S1g2q9GUDZ1lA';
const BREEDS_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
    return axios.get(`${BREEDS_URL}/breeds`)
        .then((resp) => {
           return  resp.data;
        })
        .catch((error) => {
            console.error(error);
        });
}


function fetchCatByBreed(breedId) {
    const params = new URLSearchParams({
        breed_ids: breedId,
    });
    return axios.get(`${BREEDS_URL}/images/search?${params}`)
        .then((resp) => {
            if (!resp.data.length) {
      throw new Error(resp.statusText);
    }
            return resp.data;
        });
}


export { fetchBreeds, fetchCatByBreed };