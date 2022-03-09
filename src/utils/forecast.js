const request = require("request")

// get weather details from coords
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&appid=a86e1b28d377356b1d7df88de35ae621'

    request({url, json: true}, (error, { body }) =>{
        if(error)
        {
            callback('Unable to connect to weather service!', undefined)
        }else if(body.message)
        {
            callback('Unable to find location.', undefined)
        }else
        {
            callback(undefined, {
                temperature: body.main.temp,
                weather: body.weather[0].main,
                windSpeed: body.wind.speed,
                windDegree: body.wind.deg
            })
        }
    })// resquest
}// forcast

// exports all ftns 
module.exports = forecast