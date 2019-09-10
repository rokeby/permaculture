var getWeatherData = new Promise (function (resolve, reject) {

	  var proxy = 'https://cors-anywhere.herokuapp.com/';
	  var darksky = 'https://api.darksky.net/forecast/a1299d657a769e448d9f0fca225db78d/31.9279,35.1497';

	  $.ajax({
	    url: proxy + darksky,
	    success: function(data) { 
	    	resolve (data);
	    }
  });
})

export {getWeatherData}
