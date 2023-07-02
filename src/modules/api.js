function formatUrl(data, searchValue){
    const url = `https://api.weatherapi.com/v1/${data}.json?key=d30c2a12f2b2479c9ad163928233006&q=${searchValue}&aqi=yes`
    return url;
}

async function getWeatherData(url){
    try{
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData;
    }
    catch(error){
        console.log(error);
        return error;
    };
}

export {formatUrl, getWeatherData};

