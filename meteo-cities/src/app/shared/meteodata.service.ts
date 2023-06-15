import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as data from './../cities.json';
import { MeteoData } from './meteodata.model';
import { MeteoOutput } from './meteooutput.model';

@Injectable()
export class MeteodataService {
    cities: any = data;

    constructor(private http: HttpClient) { }

    getMeteodata(citycode: string) {
     // return this.http.get('https://api.meteo.lt/v1/places/${citycode}/forecasts/long-term') // request doesn't work becouse of CORS - cross-origin request limitations
      return this.http.get(`http://localhost:4200/api/${citycode}/forecasts/long-term`) // request through proxy
      .pipe(map(
        // reshaping API data 
        (meteoData: MeteoData) => {
          const meteoArray: MeteoOutput[] = [];
          let firstDate = new Date(meteoData.forecastTimestamps[0].forecastTimeUtc).getDate();
          const lastDate = new Date(meteoData.forecastTimestamps[meteoData.forecastTimestamps.length-1].forecastTimeUtc).getDate();
          const date = new Date();
          let tempDate = new Date();
          let incrDate = new Date(tempDate.setHours(date.getHours() + 1)); 
          // average day temperature counter
          let dayForecastCounter: number; 
          // average night temperature counter
          let nightForecastCounter: number; 
          // average day temperature 
          let dayAvgForecastTemperature: number; 
           // average night temperature
          let nightAvgForecastTemperature: number; 
          let forecastedDate: Date; 
          // day weather conditions
          let forecastedDayWeather: string; 
          // night weather conditions
          let forecastedNightWeather: string;
          // checking for old data (from previous day)
          if (firstDate != date.getDate()){
            firstDate += 1;
          }
         // Forecasts of current day are not full.
         // Current day weather condition is taken from the nearest hour data
         // Weather conditions of following days are taken: night's: at 00:00, day's: at 12:00
                 
          
          for (let i = firstDate; i <= lastDate; i++ ){

            dayForecastCounter = 0; 
            nightForecastCounter = 0; 
            dayAvgForecastTemperature = 0; 
            nightAvgForecastTemperature = 0; 
            forecastedDayWeather = ""; 
            forecastedNightWeather = ""; 
            //
            for (const forecast of meteoData.forecastTimestamps) {
              const forecastDate = new Date (forecast.forecastTimeUtc);
              if (forecastDate.getDate() === firstDate && i === firstDate) { 
                // decided to use data from 0 AM to 8 AM as night hours 
                if (forecastDate > date) {                                  
                  if (forecastDate.getHours() > 0 && forecastDate.getHours() < 8 && forecastDate < incrDate) { 
                    forecastedNightWeather = forecast.conditionCode;
                  } 
                  if (forecastDate.getHours() > 12 && forecastDate.getHours() < 24 && forecastDate < incrDate) {
                    forecastedDayWeather = forecast.conditionCode;
                    
                  }
                }
              }
                if(forecastDate.getDate() === i){
                  forecastedDate = forecastDate; 
                  if (forecastDate.getHours() === 0) {
                    forecastedNightWeather = forecast.conditionCode;
                  }
                  if (forecastDate.getHours() === 12) {
                    forecastedDayWeather = forecast.conditionCode;
                  }
                  if(forecastDate.getHours() >= 8) {
                    dayAvgForecastTemperature += forecast.airTemperature;
                    dayForecastCounter++;
                  } else {
                    nightAvgForecastTemperature += forecast.airTemperature;
                    nightForecastCounter++;
                  }
                }
            }
            meteoArray.push({
              forecastedDate: forecastedDate, 
              dayAvgTemperature: !isNaN(dayAvgForecastTemperature/dayForecastCounter) ? (dayAvgForecastTemperature/dayForecastCounter).toFixed(2) : null,
              dayWeather: forecastedDayWeather,
              nightAvgTemperature: !isNaN(nightAvgForecastTemperature/nightForecastCounter) ? (nightAvgForecastTemperature/nightForecastCounter).toFixed(2) : null,
              nightWeather: forecastedNightWeather
            })
          }
        return meteoArray;
        }
      ));
    
    }

}