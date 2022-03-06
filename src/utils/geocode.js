const request = require('request')

// get cords and location from address
const geocode = (address, callback) =>{
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2F5ZWRzdWhhaWwiLCJhIjoiY2t6a3kwcXBzMG80MDJ3bXEyMjcwYmg2MCJ9.ssxdRPCPSTSA7dhGM3oHRw&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2F5ZWRzdWhhaWwiLCJhIjoiY2t6a3kwcXBzMG80MDJ3bXEyMjcwYmg2MCJ9.ssxdRPCPSTSA7dhGM3oHRw&limit=1'

    request({url, json: true}, (error, { body } = {}) =>{
        if(error){
            callback('Unable to connet to location services!', undefined)
        }else if(body.features.length === 0)
        {
            callback('Unable to find location. Try another search.', undefined)
        }else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })// request
}// geocode

// exports all ftns
module.exports = geocode