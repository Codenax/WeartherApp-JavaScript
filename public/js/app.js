
const search = document.getElementById('search');
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

    currentTime();

    navigator.geolocation.getCurrentPosition(s => {
        getWeatherData(null, s.coords)
    },
        e => {
            getWeatherData()
        })

    axios.get('../api/history')
        .then(({ data }) => {
            if (data.length > 0) {
                updateHistory(data)
            } else {
                historyElm.innerHTML = '<h3>There is no history</h3>'
            }
        })
        .catch(e => {
            console.log(e)
            alert('Error Occurred')
        })
     
    cityInput.addEventListener('keypress', function (e) {

        if (e.key === 'Enter') {
            if (e.target.value) {
                getWeatherData(e.target.value,null,weather =>{
                    e.target.value=''
                    axios.post('../api/history', weather)
                        .then(({data})=>updateHistory(data))
                        .catch(e=>{
                            console.log(e)
                            alert("Error Occurred")
                        })
                })
                
            } else {
                alert('City not found,Please provide valid city name')
            }
        }
    })
    search.addEventListener('click', function () {
        if (cityInput.value) {
            getWeatherData(cityInput.value,null,weather =>{
                cityInput.value=''
                axios.post('../api/history', weather)
                    .then(({data})=>updateHistory(data))
                    .catch(e=>{
                        console.log(e)
                        alert("Error Occurred")
                    })
            })
            
        } else {
            alert('City not found,Please provide valid city name')
        }
       
           
        
    })
}


function getWeatherData(city = DEFAULT_CITY, coords,cb ) {
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
                temp:  (Math.round((data.main.temp-273.15) * 100) / 100).toFixed(0),
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                timezone: data.timezone
            }
            setWeather(weather)
                if(cb) cb(weather)
            // console.log(data)
        })
        .catch(e => {
            console.log(e)
            alert('City not found,Please provide valid city name')
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
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + ", Time: "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds()
    timezone.innerHTML = datetime.toLocaleString()
}


function updateHistory(history){

historyElm.innerHTML = ''
history = history.reverse()

    history.forEach(h => {
        let tempHistory = masterHistory.cloneNode(true)
        tempHistory.id= ''
        tempHistory.getElementsByClassName('condition')[0].src=`${ICON_URL}${h.icon}.png`
        tempHistory.getElementsByClassName('city')[0].innerHTML= h.name
        tempHistory.getElementsByClassName('country')[0].innerHTML= h.country
        tempHistory.getElementsByClassName('main')[0].innerHTML= h.main
        tempHistory.getElementsByClassName('description')[0].innerHTML= h.description
        tempHistory.getElementsByClassName('temp')[0].innerHTML= h.temp
        tempHistory.getElementsByClassName('pressure')[0].innerHTML= h.pressure
        tempHistory.getElementsByClassName('humidity')[0].innerHTML= h.humidity

        const d = new Date((new Date().getTime()) - h.timezone / 10000)
        var currentdate = new Date(d);
        var datetime =  currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + ", Time: "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds()
        tempHistory.getElementsByClassName('timezone')[0].innerHTML= datetime.toLocaleString()
        historyElm.appendChild(tempHistory)
    })

}



/* clock setup */
  
  function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var midday = "AM";
    midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
    hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("timeNow").innerText = hour + " : " + min + " : " + sec + " " + midday; /* adding time to the div */
      var t = setTimeout(currentTime, 1000); /* setting timer */
  }
  
  function updateTime(k) { /* appending 0 before time elements if less than 10 */
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }
/* clock setup end */


function openSideBar(){
    document.getElementById("sideBar").style.left="0";
  }
  function closeSideBar(){
    document.getElementById("sideBar").style.left="-100%";
  }