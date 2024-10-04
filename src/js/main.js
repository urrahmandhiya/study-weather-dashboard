document.getElementById('weather-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    const apiKey = 'your-api-key';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Extract weather data
            const temperature = data.main.temp;
            const minTemperature = data.main.temp_min;
            const maxTemperature = data.main.temp_max;
            const weatherDescription = data.weather[0].description;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
            const visibility = data.visibility;
            const visibilityInKM = Math.round(visibility / 1000);

            // Update the page with weather data
            document.getElementById('weather-info').innerHTML = `
                <div class="flex flex-col justify-center items-center mb-4">
                    <div class="font-bold text-4xl mb-4">${data.name}</div>
                    <div class="text-sm text-gray-500 mb-4">${new Date(data.dt * 1000).toDateString()}</div>
                </div>
                <div class="flex justify-evenly items-center">
                    <div class="flex flex-col">
                        <div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                            <svg class="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                            </svg>
                        </div>
                        <div class="flex flex-row items-center justify-center mt-6">
                            <div class="font-medium text-6xl">${Math.round(temperature)}°C</div>
                            <div class="flex flex-col items-center ml-6">
                                <div>${weatherDescription}</div>
                                <div class="mt-1">
                                    <span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
                                    <span class="text-sm font-light text-gray-500">${Math.round(maxTemperature)}°C</span>
                                </div>
                                <div>
                                    <span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
                                    <span class="text-sm font-light text-gray-500">${Math.round(minTemperature)}°C</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <canvas id="myChart" width="500" height="300"></canvas>
                    </div>
                    <div class="flex flex-col justify-around mt-6">
                        <div class="flex flex-col items-center">
                            <div class="font-medium text-xl">Wind</div>
                            <div class="text-xl text-gray-500">${windSpeed} m/s</div>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="font-medium text-xl">Humidity</div>
                            <div class="text-xl text-gray-500">${humidity} %</div>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="font-medium text-xl">Visibility</div>
                            <div class="text-xl text-gray-500">${visibilityInKM} KM</div>
                        </div>
                    </div>
                </div>
            `;

            // Update the chart
            const ctx = document.getElementById('myChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Temperature', 'Humidity'],
                    datasets: [{
                        label: 'Current Weather',
                        data: [temperature, humidity],
                        backgroundColor: ['rgb(75, 192, 192)', 'rgba(0, 0, 0, 0.1)'],
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        labels: {
                            fontColor: 'black'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value + '°C';
                                }
                            }
                        }
                    }
                }
            });
        } else {
            document.getElementById('weather-info').innerHTML = `
                <div class="text-center text-red-500">Error: ${data.message}</div>
            `;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').innerHTML = `
            <div class="text-center text-red-500">Error fetching data. Please try again later.</div>
        `;
    }
});
