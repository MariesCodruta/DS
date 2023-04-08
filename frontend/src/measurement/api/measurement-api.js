import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    measurement: '/measurement'
};

function getMeasurement(callback) {
    let request = new Request(HOST.backend_api + endpoint.measurement, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMeasurementById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.measurement + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function insertMeasurement(measurement, callback){
    let request = new Request(HOST.backend_api + endpoint.measurement, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(measurement)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteMeasurement(idMeasurement, callback) {
    let request = new Request(HOST.backend_api + endpoint.measurement + '/' +  idMeasurement, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updateMeasurement(measurement,idMeasurement, callback) {
    let request = new Request(HOST.backend_api + endpoint.measurement + '/' + idMeasurement, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(measurement)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    getMeasurement,
    getMeasurementById,
    insertMeasurement,
    deleteMeasurement,
    updateMeasurement
};
