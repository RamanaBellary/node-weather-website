const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.weatherstack.com/current?access_key=14b7a8fb209d17401c05f90bbf7fa8aa&query='+latitude+','+longitude

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Error while connecting to weather service!', undefined)
        }else if(response.body.error){
            callback('Unable to find the location!', undefined)
        }
        else{  
            callback(undefined, {
                Temp: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
}

module.exports = forecast