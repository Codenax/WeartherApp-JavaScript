const condition = document.getElementById('condition');
const city = document.getElementById('city');
const country = document.getElementById('country');
const mainText = document.getElementById('main');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const timezone = document.getElementById('timezone');
const cityInput = document.getElementById('cityInput');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');
const API_KEY = '5bbb36688b0388dcd67ba24d962617e0';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ICON_URL = 'http://openweathermap.org/img/w/';
const DEFAULT_CITY = 'KUALA LUMPUR , MALAYSIA'
window.onload = function () {
    navigator.geolocation.getCurrentPosition(s => {
        getWeatherData(null, s.coords)
    },
        e => {
            getWeatherData()
        })
    cityInput.addEventListener('keypress', function (e) {

        if (e.key === 'Enter') {
            if (e.target.value) {
                getWeatherData(e.target.value)
                e.target.value = ''
            } else {
                alert('City not found,Please provide valid city name3')
            }
        }
    })
}

function getWeatherData(city = DEFAULT_CITY, coords) {
    let url = BASE_URL

    city === null ?
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` :
        url = `${url}&q=${city}`
    axios.get(url)
        .then(({ data }) => {
            let weather = {
                icon: data.weather[0].icon,
                name: data.name,
                country: data.sys.country,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                timezone: data.timezone
            }
            setWeather(weather)
            console.log(data)
        })
        .catch(e => {
            console.log(e)
            alert('City not found,Please provide valid city name2')
        })
}

function setWeather(weather) {
    condition.src = `${ICON_URL}${weather.icon}.png`
    city.innerHTML = weather.name
    country.innerHTML = weather.country
    mainText.innerHTML = weather.main
    description.innerHTML = weather.description
    temp.innerHTML = weather.temp
    pressure.innerHTML = weather.pressure
    humidity.innerHTML = weather.humidity
    const d = new Date((new Date().getTime()) - weather.timezone / 10000)
    var currentdate = new Date(d);
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " Time "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds()
    timezone.innerHTML = datetime.toLocaleString()
}