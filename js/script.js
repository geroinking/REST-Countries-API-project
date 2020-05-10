"use strict";
let input = document.getElementById('input'),
  filter = document.getElementById('filter'),
  buttonDark = document.getElementById('button-Dark'),
  buttonLight = document.getElementById('button-Light'),
  body = document.querySelector('body'),
  country = document.querySelectorAll('.country'),
  countries = document.querySelector('.countries'),
  section = document.getElementById('section'),
  topForm = document.querySelector('.top_form');


const getData = async function (url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}!`);
  }

  return await response.json();

};

function goToMain(event) {
const newCard = document.getElementById('new_card');
topForm.style.display = 'flex';
newCard.innerHTML = '';
}

//search by name

function search(name) {
  countries.innerHTML = '';
  name = input.value;
  getData(`https://restcountries.eu/rest/v2/name/${name}`)
  .then(function(data) {
    topForm.style.display = 'none';
    data.forEach(renderNewCard);
  }).catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

//sort by region
function renderCard({ name, flag, population, region, capital }) {
  
  const card = `
            <div id="${name}" class="country">
                <img  src="${flag}" alt=""> <br>
                <span class="name">${name}</span>
                <span>Population: ${population}</span>
                <span>Region: ${region}</span>
                <span>Capital: ${capital}</span>
            </div>`;

  countries.insertAdjacentHTML('afterBegin', card);
}

function renderNewCard(country) { //rendering new card after search; getting country object
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders
  } = country;

  currencies.forEach(function(e) {
    let currencyName = e.name;
    // console.log(currencyName);
  });
  console.log(currencies, languages, borders);
  
  const card = `
   <div id="new_card">
                <button id="button_back">Back</button>
                <div class="country_wrapper">
                    <div class="country_flag">
                        <image class="country_flag_flag" alt="flag" src="${flag}">
                    </div>
                    <div class="country_info">
                        <div class="info_deep">
                            <h1>${name}</h1>
                        <span><strong>Native Name: </strong>${nativeName}</span>
                        <span><strong>Population: </strong>${population}</span>
                        <span><strong>Region: </strong>${region}</span>
                        <span><strong>Sub Region: </strong>${subregion}</span>
                        <span><strong>Capital: </strong>${capital}</span>
                        <span><strong>Top Level Domain: </strong>${topLevelDomain}</span>
                        <span><strong>Currencies: </strong>${name}</span>
                        <span><strong>Languages: </strong>Dutch, French, German</span>
                        </div>
                        <div class="info_border">
                            <span><strong>Border Countries: </strong></span>
                            <a href="#" class="border_link">France</a>
                            <a href="#" class="border_link">Germany</a>
                            <a href="#" class="border_link">Netherlands</a>
                        </div>
                    </div>
                </div>
            </div>
  `;
 
  section.insertAdjacentHTML('afterbegin', card);
  const buttonBack = document.getElementById('button_back');
  buttonBack.addEventListener('click', goToMain);

}

function loadNewCard(name) {  //got onclick array with sorted country
  getData(`https://restcountries.eu/rest/v2/name/${name}`)
  .then(function(data) {
    section.innerHTML = '';
    renderNewCard(data);
  });
}

function loadCards() {
  countries.innerHTML = '';
  let region = event.target.value;
  getData(`https://restcountries.eu/rest/v2/region/${region}`)
  .then(function (data) {
    data.forEach(renderCard);

    // country.forEach(addEventListener('click', function(event) {

    //   const target = event.target;
    //   const name = target.closest('.country');

    //   if (name.id) { //TODO name.id is null while click on empty space after sort
    //     let countryName = name.id;
    //     loadNewCard(countryName);
    //   } else {
    //     event.preventDefault();
    //   }
    // }));
  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

function changeToLightTheme() {
  buttonLight.style.display = 'none';
  buttonDark.style.display = 'block';
  body.style.color = 'hsl(209, 26%, 17%)';
  body.style.backgroundColor = 'hsl(0, 0%, 100%)';
  section.style.backgroundColor = 'hsl(0, 0%, 98%)';
  country.forEach( function(e) {
    e.style.backgroundColor = 'rgb(236, 235, 235)';
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



function init() {


  filter.addEventListener('change', loadCards);

  buttonDark.addEventListener('click', changeToDarkTheme);
  buttonLight.addEventListener('click', changeToLightTheme);

  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) { //search with Enter
      search();
    }
  });
}
init();
