var getWeatherData = new Promise (function (resolve, reject) {

       $.getJSON('https://api.darksky.net/forecast/a1299d657a769e448d9f0fca225db78d/31.9279,35.1497', function(weatherData) {
        var weather = weatherData
        // console.log(weather)
        resolve (weather);
       });
})

export {getWeatherData}
