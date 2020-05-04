"use strict";
let input = document.getElementById('input'),
  country = document.querySelectorAll('.country'),
  africa = document.getElementById('Africa'),
  america = document.getElementById('America'),
  asia = document.getElementById('Asia'),
  europe = document.getElementById('Europe'),
  oceania = document.getElementById('Oceania'),
  button = document.getElementById('button'),
  filter = document.getElementById('filter');


//search by name
function search(event) {
  let name = input.value;
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response  
      response.json().then(function (data) {
        console.log(data);
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) { //search with Enter
    search();
  }
});

function filterCountries(region) {
  region = filter.value;
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response  
      response.json()
        .then(function (data) {
          console.log(data);
        });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

filter.addEventListener('change', filterCountries);

// 'https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital'
// let gerName = country[0].childNodes[3].textContent;
// let gerPopulation = country[0].childNodes[5].childNodes[1].textContent;
// let gerRegion = country[0].childNodes[7].childNodes[1].textContent;
// let gerCapital = country[0].childNodes[9].childNodes[1].textContent;
