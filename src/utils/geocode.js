const request = require('request')

const geocode = (address, callback) => {
    if(address === undefined || address === '' || !address){
        callback('location name should not be empty')
        return
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFtYW5heWFkYXZzIiwiYSI6ImNreWgyeW0wOTF5eXcyd284eDVrZTc2YnIifQ.kcmDDtPAtI4ypQg_8xRkcg&limit=1'
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect location services!', undefined)
        }else if (response.body === undefined || 
            response.body.features == undefined || 
            response.body.features.length == 0){
            callback('Unable to find the loaction', undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode