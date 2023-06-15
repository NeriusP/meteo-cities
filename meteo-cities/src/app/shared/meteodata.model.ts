export interface MeteoData {
    forecastCreationTimeUtc: Date;
    forecastTimestamps: [
        {forecastTimeUtc: Date,
        airTemperature: number,
        cloudCover: number,
        conditionCode: string,
        relativeHumidity: number,
        seaLevelPressure: number,
        totalPrecipitation: number,
        windDirection: number,
        windGust: number,
        windSpeed: number   
        }
    ],
    place: {
        administrativeDivision: string,
        code: string,
        coordinates: {latitude: number, longitude: number}
        country: string,
        countryCode: string,
        name: string
    }
}