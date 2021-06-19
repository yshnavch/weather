//const api ={
//  key:"14a68d96870cbe5e1278ddc9db16b3ff",//"08d308e481fa46cb4702004b26af72ec",
 //   base: "https://api.openweathermap.org/data/2.5/"

//}
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const climate= document.querySelector('.climate');
const humid = document.querySelector('.humid');
const precip = document.querySelector('.precip');
const uv = document.querySelector('.uv');
const main = document.querySelector('.main');
const err = document.querySelector('.err');


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    main.style.display='initial';
    getResults(searchbox.value);
  }
}
//fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
function getResults (query) {
  fetch('/climate',{
    method:"POST",
    headers:{
      'Content-Type':"application/json",
      'Accept':"application/json"
    },
    body:JSON.stringify({
      place:query
    })
  })
    .then(weather => {
      
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
   if(weather.error)
   {
    err.style.display='flex';
    city.innerText = 'No such city exists';
    main.style.display='none';
   }
   else{
      err.style.display='none';
      main.style.display='initial';
      console.log(weather);
      city.innerText = `${weather.request.query}`;
      date.innerText =`${weather.location.localtime}`;
      temp.innerHTML =`${weather.current.temperature}<span>°c</span>`;
      climate.innerHTML =`<img src=${weather.current.weather_icons[0]}><span> ${weather.current.weather_descriptions[0]}</span>`;
      humid.innerHTML=`Humidity: ${weather.current.humidity}<span>%</span>`;
      precip.innerHTML=`Precipitation: ${weather.current.precip}<span>mm</span>`;
      uv.innerHTML=`UV-Index: ${weather.current.uv_index}`;
   }
}
