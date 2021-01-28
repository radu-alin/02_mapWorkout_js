'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function positionFetchSuccess(position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      // Leaflet
      map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //handling clicks on map
      map.on('click', function clickOnMapHandler(mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();

        //display marker
        const { lat, lng } = mapEvent.latlng;
        const coords = [lat, lng];
        L.marker(coords).addTo(map);
      });
    },
    function positionFetchFail() {
      alert("Couldn't get your position.");
    }
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  //clear inputs fields
  inputDistance.value = '';
  inputDuration.value = '';
  inputCadence.value = '';
  inputElevation.value = '';

  //display marker
  const { lat, lng } = mapEvent.latlng;
  const coords = [lat, lng];
  L.marker(coords)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minHeight: 50,
        riseOnHover: true,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
