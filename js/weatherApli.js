export async function fetchPosition(city) {
    let urlPosition = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=253a2f4ab1ef09e09247676439f655d7`;
    let res = await fetch(urlPosition);
    if (!res.ok) {
        throw new Error("Error while fetching weather position");
    }
    return await res.json();
}

export async function fetchWeather(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=253a2f4ab1ef09e09247676439f655d7&units=metric`;

    try {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error("Error while fetching weather data");
        }
        let data = await res.json();
        // console.log("Fetched weather data: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching weather data: ", error);
        return null;
    }
}
