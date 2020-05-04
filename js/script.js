"use strict";
let input = document.getElementById('input'),
  filter = document.getElementById('filter'),
  buttonDark = document.getElementById('button-Dark'),
  buttonLight = document.getElementById('button-Light'),
  body = document.querySelector('body'),
  section = document.querySelector('section'),
  country = document.querySelectorAll('.country'),
  html = document.querySelector('html'),
  flag = document.querySelectorAll('#flag');


//search by name
function search(name) {
  name = input.value;
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

flag.forEach((e)=> {
  e.style.height = '200px';
});

function changeToLightTheme() {
  buttonLight.style.display = 'none';
  buttonDark.style.display = 'block';
  body.style.color = 'hsl(209, 26%, 17%)';
  body.style.backgroundColor = 'hsl(0, 0%, 100%)';
  section.style.backgroundColor = 'hsl(0, 0%, 98%)';
  country.forEach( function(e) {
    e.style.backgroundColor = 'hsl(0, 0%, 100%)';
  });
}

function changeToDarkTheme() {
  buttonDark.style.display = 'none';
  buttonLight.style.display = 'block';
  body.style.color = 'hsl(0, 0%, 100%)';
  body.style.backgroundColor = 'hsl(209, 23%, 22%)';
  section.style.backgroundColor = 'hsl(207, 26%, 17%)';
  country.forEach( function(e) {
    e.style.backgroundColor = 'hsl(209, 23%, 22%)';
  });
}
buttonDark.addEventListener('click', changeToDarkTheme);
buttonLight.addEventListener('click', changeToLightTheme);
// 'https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital'
// let gerName = country[0].childNodes[3].textContent;
// let gerPopulation = country[0].childNodes[5].childNodes[1].textContent;
// let gerRegion = country[0].childNodes[7].childNodes[1].textContent;
// let gerCapital = country[0].childNodes[9].childNodes[1].textContent;
