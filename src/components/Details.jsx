import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Container, Row,Col,Card} from "react-bootstrap";

const Details = () => {  
    const { cityName } = useParams(); 
    const [cityData, setCityData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [forecastData,setForecastData] = useState(null);

    useEffect(() => {
        const fetchCityData = async () => {  //Fetch in merito alle città
            setLoading(true);
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=347583340bc7dad440715b194a29175a`);
                if (!response.ok) {
                    throw new Error('Errore nella risposta dell\'API');
                }

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setCityData(data[0]);
                    const { lat, lon } = data[0];  //raccolta informazioni per il meteo
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

        const fetchWeatherData = async (lat, lon) => {  //Fetch in merito al clima attuale
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


        const fetchForecastData = async (lat, lon) => {  //Fetch in merito al clima in 5 giorno
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
        <Container style={{textAlign:'center'}}>
             <h1 >Dettagli per {cityName}</h1>
            <Row>
                <Col>
                <Card>
                <Card.Body>
                    <Card.Title style={{fontWeight:"900", fontSize:"20px"}}>Informazioni città</Card.Title>
                    {cityData ? (
                    <div>
                    <p>Nome: {cityData.name}</p>
                    <p>Stato: {cityData.state}</p>
                    <p>Paese: {cityData.country}</p>
                    </div>
               
            ) :
             (
                <p>Nessun risultato trovato per {cityName}</p>
            )}
            </Card.Body>
            </Card>
</Col>
<Col>
            {weatherData ? (
                <Card>
                    <Card.Body>
                    <h2>Meteo ATTUALE per {cityName}</h2>
                    <h2 className=" display-5  " style={{fontSize:'80px',color:'#FFD700'}}>{weatherData.main.temp} °C</h2>
                    <p style={{fontSize:'20px', fontWeight:'bold'}}>Descrizione: {weatherData.weather[0].description}</p>
                    <p style={{fontSize:'20px', fontWeight:'bold'}}>Umidità: {weatherData.main.humidity} %</p>
                    <p style={{fontSize:'20px', fontWeight:'bold'}}>Vento: {weatherData.wind.speed} m/s</p>
                    </Card.Body>
                    </Card>
            ) : 
            (
                <p>Nessun dato meteo attuale trovato per {cityName}</p>
            )}
            </Col>
            </Row>
            <Row>
    {forecastData && forecastData.list ? (
        <div>
            <h2 style={{ marginTop: "8rem" }}>Previsioni meteo per i prossimi 5 giorni</h2>
            <ul>
            {forecastData.list.slice(0, 5).map((forecast, index) => (
                <p key={index}>
                    <p style={{color:"white"}}>Data: {new Date(forecast.dt * 1000).toLocaleString()}</p>
                    <p>Temperatura: {forecast.main.temp} °C</p>
                    <p>Condizioni: {forecast.weather[0].description}</p>
                    <p>Umidità: {forecast.main.humidity} %</p>
                    <p>Vento: {forecast.wind.speed} m/s</p>
                    <hr/>
                </p>
            ))}
        </ul>
        </div>
    ) : 
    (
        <p>Nessun dato di previsione trovato per {cityName}</p>)}
</Row>
        </Container>
    );
};

export default Details;