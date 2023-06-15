import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MeteodataService } from '../shared/meteodata.service';
import { MeteoOutput } from '../shared/meteooutput.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  

  cities: {name: string, code: string}[] = [];
  city: {name: string, code: string};
  gettingData: boolean = false;
  error = null;
  meteodata: MeteoOutput[];
  displayDay: boolean = true;

  constructor(private meteodataService: MeteodataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Imports initial cities from the file
    this.cities = this.meteodataService.cities.default;
        
    // stebimi routo parametrai, jei jie teisingi, siunčiama užklausa duomenims iš API gauti
    // Checking route parameters, if they're correct, sends request to API
    this.route.params.subscribe(
      (params: Params) => {
        this.city = this.cities.find(city => city.code === params['citycode']);
        
        if (this.city) {
          this.onGetMeteodata(this.city.code);
          
          
        }
      }
    );
  }

  // get data from API
  onGetMeteodata(citycode: string) {
    this.gettingData = true;
    
    this.meteodataService.getMeteodata(citycode).subscribe({
      next: data => {
        this.gettingData = false;
        this.meteodata = data;
      },
      error: error => {
        this.error = error;
        console.log(error);
      }

    }
    );
  }

// sends awesomefonts icon class to the template
   getMeteoIcon(meteoCode: string, isDay: boolean = true) {
    let classNames: string;
      switch(meteoCode) {
        case 'clear': classNames = isDay ? "far fa-sun" : "far fa-moon";
        break;
        case 'partly-cloudy':         
        case 'cloudy-with-sunny-intervals':
        case 'isolated-clouds': classNames = isDay ? "fas fa-cloud-sun" : "fas fa-cloud-moon";
        break;
        case 'scattered-clouds': classNames = isDay ? "fas fa-cloud-sun" : "fas fa-cloud-moon";
        break;
        case 'cloudy': classNames = "fas fa-cloud";
        break;
        break; 
        case 'light-rain': 
        case 'rain':
        case 'moderate-rain':
        case 'heavy-rain': classNames = "fas fa-cloud-rain";
        break;
        case 'heavy-rain-with-thunderstorms': classNames = "fa-solid fa-cloud-bolt";
        break; 
        case 'na': classNames = "fas fa-rainbow";
        break;
        // default:  classNames = "fas fa-minus"
      }
    return classNames;
  }

  //sends day of the week to the template
  getDayOfTheWeek(dayNo: number) {
    let day: string = "";
    switch(dayNo) {
      case 1 : day = "Pirmadienis";
      break;
      case 2 : day = "Antradienis";
      break;
      case 3 : day = "Trečiadienis";
      break;
      case 4 : day = "Ketvirtadienis";
      break;
      case 5 : day = "Penktadienis";
      break;
      case 6 : day = "Šeštadienis";
      break;
      case 0 : day = "Sekmadienis";
      break;
    }
    return day;
  }
}

