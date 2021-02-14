const request = require('request')

const geocode = (address, callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoicmFzaXRlciIsImEiOiJja2t6enhoNXEwaDlyMnZwZW9udzB1bmlmIn0.2_KwrkD0qZaU4_NPOVJu_g&limit=1'
    request({url,json:true},(error, {body})=>{
    if(error){
        callback('Unable to connect to location service')
    } else if (body.message || body.features.length === 0){
        callback('Unable to find location')
    } else {
        const features = body.features[0]
        const place = features.place_name
        const latitude = features.center[1]
        const longitude = features.center[0]
        callback(undefined,{
            latitude,
            longitude,
            place
        })
       //weatherrequest(latitude, longitude)
    }
})
}

module.exports = geocode