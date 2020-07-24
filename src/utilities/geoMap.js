const request = require('request');

const geoMap = (address, callable) => {
    const mapURL= ' https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoieXBhdGVsMjA4NSIsImEiOiJja2N5MjNlNW4wNW95MzFvM2N4ZjBjcHVlIn0.LBUdkT3vi-MN1Ey7HuXfPg';

    request({url: mapURL, json: true},(error,response) => {
        if(error){
            callable('connection error on geo locations', undefined);
        }else if(response.body.features.length === 0){
            callable('something is wrong..', undefined);
        }else{
            callable(undefined,{
                lat: response.body.features[0].center[0],
                long: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geoMap;

