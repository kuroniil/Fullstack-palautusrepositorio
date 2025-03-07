import { WeatherProps } from "../types";

const Weather = (props: WeatherProps) => (
    <p>weather
        sunny
        <input
        type="radio"
        name="weather"
        value="sunny"
        onChange={(event) => props.setNewWeather(event.target.value)}
        />
        rainy<input
        type="radio"
        name="weather"
        value="rainy"
        onChange={(event) => props.setNewWeather(event.target.value)}
        />
        cloudy<input
        type="radio"
        name="weather"
        value="cloudy"
        onChange={(event) => props.setNewWeather(event.target.value)}
        />
        stormy<input
        type="radio"
        name="weather"
        value="stormy"
        onChange={(event) => props.setNewWeather(event.target.value)}
        />
        windy<input
        type="radio"
        name="weather"
        value="windy"
        onChange={(event) => props.setNewWeather(event.target.value)}
        />
    </p>
);

export default Weather;