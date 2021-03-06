const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=adee413f51ac88fbd04c4d36fa6c9938&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect with local services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.current.weather_descriptions.humidity)
            console.log(body.daily.data[0])
            callback(undefined, body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + ' and humidity ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast