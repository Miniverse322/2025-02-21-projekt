import {fetchPosition, fetchWeather} from "./weatherApli.js";

let weatherContainer = document.createElement('div')
let body = document.querySelector('body');
// body.style.backgroundColor = "lightskyblue";
body.className = "d-inline-flex p-2";


let buttonDiv = document.createElement('div');
body.appendChild(buttonDiv);
let btnShowWeather = document.createElement('button');
buttonDiv.appendChild(btnShowWeather);
btnShowWeather.textContent = "Show Weather";
btnShowWeather.className = "btn btn-outline-info";
btnShowWeather.style.margin = "5px";
buttonDiv.appendChild(btnShowWeather);

let inputDiv = document.createElement('div');
let inputTextField = document.createElement('input');
inputTextField.readOnly = true;
inputTextField.id = 'cityInput';
inputTextField.style.margin = "7px";
body.appendChild(inputDiv);
inputDiv.appendChild(inputTextField);

let weatherTextContainer = document.createElement('div');
weatherContainer.appendChild(weatherTextContainer);
// weatherContainer.className = "border border-danger";
weatherContainer.className = "d-flex p-2";
weatherContainer.style.marginLeft = '70px';

// weatherTextContainer.className = "border border-danger";

async function loadWeatherForCities(city) {
    let weatherPosition = await fetchPosition(city);

    if (!weatherPosition || weatherPosition.length === 0) {
        console.error("No position data found for the city.");
        return;
    }

    for (let i = 0; i < weatherPosition.length; i++) {
        let lat = weatherPosition[i].lat;
        let lon = weatherPosition[i].lon;

        let weatherData = await fetchWeather(lat, lon);

        if (weatherData) {
            displayWeather(weatherData);
        } else {
            console.error("No weather data for this city.");
        }
    }
}

btnShowWeather.addEventListener('click', async () => {

    // let city = prompt("Enter the name of the city:");

    let city = document.getElementById('cityInput').value;

    weatherTextContainer.innerHTML = '';

    await loadWeatherForCities(city);

    document.getElementById('cityInput').value = '';
})

function displayWeather(weatherData) {

    let locationTitle = document.createElement('h3');
    locationTitle.textContent = "City: " + weatherData.name + ", " + weatherData.sys.country;
    weatherTextContainer.appendChild(locationTitle);

    let cityTemperature = document.createElement('p');
    cityTemperature.textContent = "Temperature: " + weatherData.main.temp + "°C";
    weatherTextContainer.appendChild(cityTemperature);

    let cityFeelsLike = document.createElement('p');
    cityFeelsLike.textContent = "Feels like: " + weatherData.main.feels_like + "°C";
    weatherTextContainer.appendChild(cityFeelsLike);

    let cityHumidity = document.createElement('p');
    cityHumidity.textContent = "Humidity: " + (weatherData.main.humidity) + "%";
    weatherTextContainer.appendChild(cityHumidity);

    let cityMaxTemp = document.createElement('p');
    cityMaxTemp.textContent = "Max Temp: " + weatherData.main.temp_max + "°C";
    weatherTextContainer.appendChild(cityMaxTemp);

    let cityMinTemp = document.createElement('p');
    cityMinTemp.textContent = "Min Temp: " + weatherData.main.temp_min + "°C";
    weatherTextContainer.appendChild(cityMinTemp);

    let citySky = document.createElement('p');
    citySky.textContent = "Weather: " + weatherData.weather[0].main + ", " + weatherData.weather[0].description;
    weatherTextContainer.appendChild(citySky);

    showWeatherImage(weatherData.weather[0].main);

    // weatherTextContainer.className = "border border-danger";

}

function showWeatherImage(citySkyData) {
    let imageDiv = document.createElement('div');
    weatherTextContainer.appendChild(imageDiv);

    let gifUrl;
    if (citySkyData === "Clouds") {
        gifUrl = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3UwbTQ0OW0zdnJpeThmdjN0YnEzaWh5eDBtNm5tOHlpZTBqcXVveCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gjUHpcyu6cdZdNtmkV/giphy.gif";
    } else if (citySkyData === "Rain") {
        gifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDgxeHUzYTE3cGZ5Mmw2OGFxbXFnMmNkcXRxajlodmNmNjBnemVlcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l2ir9TVxVFOcDzMAzB/giphy.gif";
    } else if (citySkyData === "Clear") {
        gifUrl = "https://media.giphy.com/media/ZpCOa1Rr3hWLvNDNTb/giphy.gif?cid=ecf05e477f6oq49y630gu94vx2owsmpouhxb0luu7micl3xk&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    } else if (citySkyData === "Snow") {
        gifUrl = "https://media.giphy.com/media/l0HlFaDrQ6B3BsXQI/giphy.gif?cid=ecf05e470uup78kpc8e4oeafi091rhgsun0d7ea3khr23bsc&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    } else if (citySkyData === "Mist") {
        gifUrl = "https://media.giphy.com/media/yhZr5Wx7CBFbq/giphy.gif?cid=ecf05e47rayz3yd20m7p0fcqyo679wkbj7dlixta6t28yaz7&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    } else if (citySkyData === "Drizzle") {
        gifUrl = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJ6NzQ5ZGh2NW04aTJ4aHR5azhuZnp3c3F6cTV6OWE4NWhwZWZmNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qPs7TwtLoVRRCR6qJE/giphy.gif";
    } else {
        gifUrl = "https://media.giphy.com/media/nCyEXffuVCsGqMoYy4/giphy.gif?cid=790b761181humo5inwa5c11g8o39fhk2vvhpxgowfow6m9m1&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    }

    let gifImg = document.createElement('img');
    gifImg.src = gifUrl;
    gifImg.style.width = '300px';
    imageDiv.appendChild(gifImg);
}

let buttonsDiv = document.createElement('div');
buttonsDiv.style.display = 'grid';
buttonsDiv.style.gridTemplateColumns = 'repeat(5, 50px)';
buttonsDiv.style.gap = '10px';
let buttonsContainer = document.createElement('div');


for (let i = 0; i < 26; i++) {
    let buttons = document.createElement('button');
    buttons.textContent = String.fromCharCode(97 + i);
    buttons.className = "btn btn-outline-dark";
    buttonsContainer.appendChild(buttonsDiv);
    buttonsDiv.appendChild(buttons);

    buttons.addEventListener('mouseover', function () {
        inputTextField.value += buttons.textContent;
    });
}

document.body.appendChild(buttonsContainer);
let deleteButton = document.createElement('button');
deleteButton.textContent = 'Del';
deleteButton.className = "btn btn-outline-dark";
buttonsDiv.appendChild(deleteButton);

deleteButton.addEventListener('mouseover', function () {
    inputTextField.value = inputTextField.value.slice(0, -1);
});

body.appendChild(weatherContainer);
