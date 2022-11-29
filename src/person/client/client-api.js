import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    users1: '/user',
    device: '/device',
    cons: '/consumption',
    client: '/device/client',
    login: '/user/login',

};


function getConsByDay(date, callback) {
    let request = new Request(HOST.backend_api +'/consumption', {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(date)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}
function getDevicesByUser(user, callback) {
    let request = new Request(HOST.backend_api +endpoint.client, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}
function insertCons(callback) {
    let request = new Request(HOST.backend_api +endpoint.cons, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getConsByDay,
    getDevicesByUser,
    insertCons
};
