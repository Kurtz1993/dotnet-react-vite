import {Button, Stack} from '@mui/material';
import {useEffect, useState} from 'react';

import {WeatherForecast, WeatherForecastService} from './client';

function App() {
    const [forecasts, setForecasts] = useState<WeatherForecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents =
        forecasts === undefined ? (
            <p>
                <em>
                    Loading... Please refresh once the ASP.NET backend has started. See{' '}
                    <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more
                    details.
                </em>
            </p>
        ) : (
            <table aria-labelledby="tableLabel" className="table table-striped">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
                </thead>
                <tbody>
                {forecasts.map((forecast) => (
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );

    return (
        <Stack alignItems="center" justifyContent="center"
               sx={{backgroundColor: '#222', color: '#eee', height: '100vh'}}>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <Button onClick={() => alert('Hello, world!')} variant="contained">
                Click me
            </Button>
        </Stack>
    );

    async function populateWeatherData() {
        const res = await WeatherForecastService.get();
        setForecasts(res);
    }
}

export default App;
