'use strict'

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// allow to open locationn or not
// let map, mapEvent;
// if(navigator.geolocation){
//   navigator.geolocation.getCurrentPosition(function(position){
//     const {latitude} = position.coords
//     const {longitude} = position.coords
//     console.log(`https://www.google.pt/maps/@${latitude},${longitude}`)
    
    
//     const coords = [latitude , longitude]
//     map = L.map('map').setView(coords, 13);
    
//     L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);
  
//   map.on('click' , function(mapE){
//     mapEvent = mapE
//     console.log(mapEvent)
//     form.classList.remove('hidden')
//     inputDistance.focus()
//   })
// },
// function(){
//   alert("donot allow to access")
// })
// }

// form.addEventListener('submit' ,function(e){
//   e.preventDefault()
//   inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value  =  '';

//   console.log(mapEvent)
//   const  {lat, lng} = mapEvent.latlng
//   L.marker([lat, lng]).addTo(map)
//   .bindPopup(
//    L.popup({
//      maxWidth: 250,
//      minWidth: 100,
//      autoClose: false,
//      closeOnClick: false,
//      className: 'running-popup',
//    }) )
//    .setPopupContent('workout')
//    .openPopup();
  
//   })
//   inputType.addEventListener('change', function(){
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
//   })

// covert it to oop 

// divided to 3 classes prent and 2 classes that inherite from parent ( workout, cycling and running )
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// app class to rener map 
class App {
  #map;
  #workouts;
  #mapZoomLevel = 13;
  constructor(){
    this._getPosition()
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }
}


const app = new App();