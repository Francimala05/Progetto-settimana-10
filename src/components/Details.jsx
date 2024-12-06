import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
    const { cityName } = useParams();
    const [cityData, setCityData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [forecastData,setForecastData] = useState(null);

    useEffect(() => {
        const fetchCityData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=347583340bc7dad440715b194a29175a`);
                if (!response.ok) {
                    throw new Error('Errore nella risposta dell\'API');
                }

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setCityData(data[0]);
                    const { lat, lon } = data[0];
                    fetchWeatherData(lat, lon);
                    fetchForecastData(lat, lon)
                } else {
                    setError('Nessun risultato trovato per questa città.');
                }
            } catch (error) {
                console.error('Errore durante la richiesta:', error);
                setError('Si è verificato un errore durante il recupero dei dati della città.');
            } finally {
                setLoading(false);
            }
        };

        const fetchWeatherData = async (lat, lon) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=347583340bc7dad440715b194a29175a&units=metric`);
                if (!response.ok) {
                    throw new Error('Errore nella risposta dell\'API meteo');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Errore durante la richiesta dei dati meteo:', error);
                setError('Si è verificato un errore durante il recupero dei dati meteo.');
            }
        };


        const fetchForecastData = async (lat, lon) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=347583340bc7dad440715b194a29175a&units=metric`);
                if (!response.ok) {
                    throw new Error('Errore nella risposta dell\'API meteo');
                }
                const data = await response.json();
                setForecastData(data);
            } catch (error) {
                console.error('Errore durante la richiesta dei dati meteo previsti:', error);
                setError('Si è verificato un errore durante il recupero dei dati meteo previsti.');
            }
        };

        if (cityName) {
            fetchCityData();
        }
    }, [cityName]);

    if (loading) {
        return <p>Caricamento in corso...</p>;
    }

    if (error) {
        return <p>Errore: {error}</p>;
    }

    return (
        <div>
            <h1>Dettagli per {cityName}</h1>
            {cityData ? (
                <div>
                    <h2>Informazioni città</h2>
                    <p>Nome: {cityData.name}</p>
                    <p>Stato: {cityData.state}</p>
                    <p>Paese: {cityData.country}</p>
                </div>
            ) : (
                <p>Nessun risultato trovato per {cityName}</p>
            )}

            {weatherData ? (
                <div>
                    <h2>Meteo per {cityName}</h2>
                    <p>Temperatura: {weatherData.main.temp} °C</p>
                    <p>Descrizione: {weatherData.weather[0].description}</p>
                    <p>Umidità: {weatherData.main.humidity} %</p>
                    <p>Vento: {weatherData.wind.speed} m/s</p>
                </div>
            ) : (
                <p>Nessun dato meteo trovato per {cityName}</p>
            )}


{forecastData ? (
                <div>
                    <h2>Previsioni meteo per i prossimi 5 giorni</h2>
                    <ul>
                        {forecastData.slice(0, 5).map((forecast, index) => (
                            <li key={index}>
                                <p>Data: {new Date(forecast.dt * 1000).toLocaleString()}</p>
                                <p>Temperatura: {forecast.main.temp} °C</p>
                                <p>Condizioni: {forecast.weather[0].description}</p>
                                <p>Umidità: {forecast.main.humidity} %</p>
                                <p>Vento: {forecast.wind.speed} m/s</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Nessun dato di previsione trovato per {cityName}</p>
            )}


        </div>
    );
};

export default Details;