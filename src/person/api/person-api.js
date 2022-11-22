import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    users1: '/user',
    device: '/device',
    mapping: '/device/mapping',
    login: '/user/login',

};

function updateData(tabIndex,  data, callback) {

    let request = new Request(HOST.backend_api + (tabIndex===0 ? endpoint.users1: endpoint.device),
        {method: 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)});
    RestApiClient.performRequest(request, callback);
}

function getData(tabIndex, callback) {
    let request = new Request(HOST.backend_api + (tabIndex===0 ? endpoint.users1: (tabIndex===2 ? endpoint.mapping : endpoint.device)), {method: 'GET',})
    RestApiClient.performRequest(request, callback);
}

function getDataById(tabIndex,params, callback){
    let request = new Request(HOST.backend_api + (tabIndex===0 ? endpoint.users1: endpoint.device) + params.id, {method: 'GET'});
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteByName(tabIndex, name, callback){
    let request = new Request(HOST.backend_api + (tabIndex===0 ? endpoint.users1: endpoint.device),
        {method: 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(name)});
    RestApiClient.performRequest(request, callback);
}

function updateUserId( mappingDTO, callback){
    let request = new Request(HOST.backend_api +  endpoint.mapping,
        {method:'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mappingDTO)});
    RestApiClient.performRequest(request, callback);
}

function postData(tabIndex,data, callback){
    let request = new Request(HOST.backend_api +(tabIndex===0 ? endpoint.users1: (tabIndex===2 ? endpoint.mapping : endpoint.device)), {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function login(data, callback){
    let request = new Request(HOST.backend_api +endpoint.login, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}



export {
    getData,
    getDataById,
    postData,
    deleteByName,
    updateUserId,
    updateData,
    login,
};
