import axios from 'axios'

const osnovniURL = '/serije'

const dohvatiSve = () =>{
    const promise = axios.get(osnovniURL);
    return promise.then(response => response.data)
}

const stvori = noviObjekt => {
    return axios.post(osnovniURL,noviObjekt)
}

const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniURL}/${id}`, noviObjekt)
}

const brisi = id => {
    return axios.delete(`${osnovniURL}/${id}`)
}

export default {dohvatiSve, stvori, osvjezi, brisi}