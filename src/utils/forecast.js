const request = require('request')

const forecast = (lat,lon, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=7893fc1374135e9a1f4e93d9432b38a7&query=
                    ${encodeURIComponent(lat)},${encodeURIComponent(lon)}&units=m`
        request({url,json:true},(error, {body})=>{
            if(error){
                callback('Unable to connect to weather service', undefined)
            }
            else if(body.error){
                callback('Unable to find location', undefined)
            }
            else {
                const current = body.current
                const temp = current.temperature
                const feelslike = current.feelslike
                const desc = current.weather_descriptions[0]
                callback(undefined, {
                    temp,
                    feelslike,
                    desc
                })
            }
})}

module.exports = forecast