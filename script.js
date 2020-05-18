"use strict";
const input = document.getElementById('input'),
     filter = document.getElementById('filter'),
 buttonDark = document.getElementById('button-Dark'),
buttonLight = document.getElementById('button-Light'),
       body = document.querySelector('body'),
    country = document.querySelectorAll('.country'),
  countries = document.querySelector('.countries'),
    section = document.getElementById('section'),
formWrapper = document.querySelector('.form_wrapper'),
headerWrapper = document.querySelector('.header-wrapper'),
topForm = document.querySelector('.top_form');

const getData = async function (url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}!`);
  }

  return await response.json();

};

const goToMain = (event) => {
  const newCard = document.getElementById('new_card');
  newCard.innerHTML = '';
  formWrapper.style.display = 'block';
};

//search by name
const search = (name) => {
  countries.innerHTML = '';
  name = input.value;
  getData(`https://restcountries.eu/rest/v2/name/${name}`)
    .then((data) => {

      formWrapper.style.display = 'none';
      data.forEach(renderNewCard);

    }).catch((err) => {
      console.log('Fetch Error :-S', err);
    });
};

//sort by region
const renderCard = ({
  name,
  flag,
  population,
  region,
  capital
}) => {

  const card = `
            <div id="${name}" class="country">
                <img  src="${flag}" alt=""> <br>
                <span class="name">${name}</span>
                <span>Population: ${population}</span>
                <span>Region: ${region}</span>
                <span>Capital: ${capital}</span>
            </div>`;


  countries.insertAdjacentHTML('afterBegin', card);
};

const renderNewCard = (country) => { //rendering new card after search; getting country object

  const wrap = document.getElementById('wrap');
  wrap.innerHTML = '';

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
  } = country;

  let arrCur = [];
  let arrLang = [];

  for (let value of currencies) {
    arrCur.push(value.name);
  }
  for (let item of languages) {
    arrLang.push(item.name);
  }

  const card = `
   <div id="new_card">
                <button id="button_back">Close</button>
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
                        </div>
                    </div>
                </div>
            </div>
  `;

  wrap.insertAdjacentHTML('afterbegin', card);
  const buttonBack = document.getElementById('button_back');
  buttonBack.addEventListener('click', goToMain);
};

const renderCardOnclick = (event) => {
  const target = event.target;
  const name = target.closest('.country');
  const countryName = name.id;
  if (countryName) {
    getData(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then((data) => {
        data.forEach((item) => {

          window.scrollTo(0, 0);
          renderNewCard(item); // passing object with proper name to render
          countries.style.marginTop = '40px';

        });
      });
  }
};

const loadCards = () => {

  countries.innerHTML = '';
  let region = event.target.value;

  getData(`https://restcountries.eu/rest/v2/region/${region}`)
    .then((data) => {
      data.forEach(renderCard);
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
};

const changeToLightTheme = () => {
  buttonLight.style.display = 'none';
  buttonDark.style.display = 'block';
  body.style.color = 'hsl(209, 26%, 17%)';
  headerWrapper.style.backgroundColor = 'hsl(0, 0%, 100%)';
  body.style.backgroundColor = 'hsl(0, 0%, 95%)';
};
const changeToDarkTheme = () => {
  buttonDark.style.display = 'none';
  buttonLight.style.display = 'block';
  body.style.color = 'hsl(0, 0%, 100%)';
  headerWrapper.style.backgroundColor = 'hsl(209, 23%, 22%)';
  topForm.style.backgroundColor = 'hsl(209, 23%, 22%)';
  body.style.backgroundColor = 'hsl(207, 26%, 17%)';
};

const init = () => {

  countries.addEventListener('click', renderCardOnclick);

  filter.addEventListener('change', loadCards);

  buttonDark.addEventListener('click', changeToDarkTheme);
  buttonLight.addEventListener('click', changeToLightTheme);

  input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) { //search with Enter
      search();
    }
  });
};
init();
