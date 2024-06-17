'use strict'

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// allow to open locationn or not
let map, mapEvent;
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
    const {latitude} = position.coords
    const {longitude} = position.coords
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`)
    
    
    const coords = [latitude , longitude]
    map = L.map('map').setView(coords, 13);
    
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  map.on('click' , function(mapE){
    mapEvent = mapE
    console.log(mapEvent)
    
    // .bindPopup(
    //   L.popup({
      //     maxWidth: 250,
    //     minWidth: 100,
    //     autoClose: false,
    //     closeOnClick: false,
    //     className: 'running-popup',
    //   })
    form.classList.remove('hidden')
    
    
  })
},
function(){
  alert("donot allow to access")
})
}

form.addEventListener('submit' ,function(e){
  e.preventDefault()
  inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value  =  '';

  console.log(mapEvent)
  const  {lat, lng} = mapEvent.latlng
  L.marker([lat, lng]).addTo(map)
  .bindPopup(
   L.popup({
     maxWidth: 250,
     minWidth: 100,
     autoClose: false,
     closeOnClick: false,
     className: 'running-popup',
   }) )
   .setPopupContent('workout')
   .openPopup();
  
  })
  inputType.addEventListener('change', function(){
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
  })