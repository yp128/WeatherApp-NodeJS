const request = require('request');

const weatherRequest = (lat, long, callable) =>{
    const url ='http://api.weatherstack.com/current?access_key=7138b2e58e8bcdf9675ff8d8e1a08a4a&query=' + lat+ ',' + long;

    request({url, json: true},(error, response) =>{
        if(error){
            callable('connection error', undefined);
        }else if(response.body.error){
            callable('data is not found', undefined);
        }else{
            callable(undefined,{
                temperature: response.body.current.temperature,
                weatherCondition: response.body.current.weather_descriptions[0],
                precip: response.body.current.precip
            });
        }

    });
}
module.exports = weatherRequest;