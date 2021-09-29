import axios from 'axios';
const osnovniURL = '/user';
export default {
    getSerije : () => {
        return fetch('/user/serije')
                .then(response => {
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else{
                        return {message : {msgBoddy : "UnAuthorized", msgError : true}};
                    }
                });
    },
    postSerija : serija => {
        return fetch('/user/serija',{
            method : "post",
            body : JSON.stringify(serija),
            headers : {
                'Content-type' : 'application/json'
            }
        }).then(response => {
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBoddy : "UnAuthorized", msgError : true}};
            
        });
    },
    deleteSerija : id => {
        return axios.delete(`${osnovniURL}/${id}`)
    },
    putSerija : (id,noviObjekt) => {
        return axios.put(`${osnovniURL}/${id}`, noviObjekt)
    }
}

