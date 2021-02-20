//Get location api
fetch('http://api.ipstack.com/24.133.98.9?access_key=YOUR_API_KEY')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        const getlocation = data.city;
// Get Openweather Api
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${getlocation}&appid=YOUR__API_KEY`)
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response)
        }
    }).then(data => {
        //Main Date
        const date = new Date().toLocaleDateString(); 
        //Daily Date
        function GetDates(startDate, daysToAdd) {
            var arrayDates = [];
                var currentDate = new Date();
                currentDate.setDate(startDate.getDate() + daysToAdd);
                arrayDates.push(DayAsString(currentDate.getDay()));
            return arrayDates;
        }   
        function DayAsString(dayIndex) {
            var weekdays = new Array(7);
            weekdays[0] = "Sun";
            weekdays[1] = "Mon";
            weekdays[2] = "Tue";
            weekdays[3] = "Wed";
            weekdays[4] = "Thur";
            weekdays[5] = "Fri";
            weekdays[6] = "Sat";
            
            return weekdays[dayIndex];
        }
        var startDate = new Date();
        //Set icon
        const getIcon = function(icon){   
            var WeatherIcon;
            switch(icon){
                case 'Thunderstorm':
                   WeatherIcon= 'img/strom.png';
                    break;
                case 'Drizzle':
                    WeatherIcon='img/drizzle.png';
                    break;
                case 'Rain':
                    WeatherIcon='img/rain.png';
                    break;
                case 'Snow':
                    WeatherIcon = 'img/snow.png';
                    break;
                case 'Clear':
                   WeatherIcon= 'img/sun.png';
                    break;
                case 'Clouds':
                    WeatherIcon='img/clouds.png';
                    break;
                case 'Atmosphere':
                   WeatherIcon='img/haze.png';
                    break;
                } return WeatherIcon;
           }
        const main = `
    <div class="city">
    ${data.city.name}
    </div>
    <div class="Tdate">
    ${date}
    </div>
    <div class="description">
    ${data.list[0].weather[0].description}
    </div>
    <div class="temp">
    ${Math.round(data.list[0].main.temp - 273.15)}<p>°</p>  
    </div>
    `
       const fiveDays = `
    <div class="days-bar">
        <p class="day">${GetDates(startDate, 1)}</p>
        <div class="tempIcon"><img src="${getIcon(data.list[1].weather[0].main)}"id="icon" width="80%"></div>
        <p class="dayTemp">${Math.round(data.list[1].main.temp - 273.15)}<span class="cel">°</span> </p>
        </div>
    <div class="days-bar">
        <p class="day">${GetDates(startDate, 2)}</p>
        <div class="tempIcon"><img src="${getIcon(data.list[2].weather[0].main)}"id="icon" width="80%"></div>
        <p class="dayTemp">${Math.round(data.list[2].main.temp - 273.15)}<span class="cel">°</span> </p>
    </div>
    <div class="days-bar">
        <p class="day">${GetDates(startDate, 3)}</p>
        <div class="tempIcon"><img src="${getIcon(data.list[3].weather[0].main)}"id="icon" width="80%"></div>
        <p class="dayTemp">${Math.round(data.list[3].main.temp - 273.15)}<span class="cel">°</span> </p>
    </div>
    <div class="days-bar">
        <p class="day">${GetDates(startDate, 4)}</p>
        <div class="tempIcon"><img src="${getIcon(data.list[4].weather[0].main)}"id="icon" width="80%"></div>
        <p class="dayTemp">${Math.round(data.list[4].main.temp - 273.15)}<span class="cel">°</span> </p>
    </div>
    <div class="days-bar">
        <p class="day">${GetDates(startDate, 5)}</p>
        <div class="tempIcon"><img src="${getIcon(data.list[5].weather[0].main)}"id="icon" width="80%"></div>
        <p class="dayTemp">${Math.round(data.list[5].main.temp - 273.15)}<span class="cel">°</span> </p>
    </div>
    `
    document.querySelector('#result').innerHTML = main;
    document.querySelector('#daysResult').innerHTML = fiveDays;
    });





