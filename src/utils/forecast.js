const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c50abce7f275a77bbd02e52a17dc5c24&query=' + latitude + ',' + longitude

    request({url , json:true},(error,{body}) => {
        if(error) {
            callback('Unable to connect to location services.',undefined)
        }else if (body.error) {
            callback('Unable to find location.Try another search.')
        
         }else{
            callback(undefined, body.current.weather_descriptions + ". It is currently "+ body.current.temperature +" degrees out.There is a "+body.current.precip+"% chance of rain."
            )
        }
    })

}

module.exports = forecast