const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=83fcda2b8f781d759e9b31e718c07ac0&query='+latitude+','+longitude+'&units=f'
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('unable to connect to location services', undefined);
        }else if(response.body.error){
            callback('unable to find location. try another search', undefined);
        }else{
            callback(undefined, 
                
              response.body.current.weather_descriptions[0] + '. It is currenlty '+response.body.current.temperature+ ' degrees outside '+ 'but feels like '+ response.body.current.feelslike+' degrees '
            )
        }
    })
}





module.exports = forecast