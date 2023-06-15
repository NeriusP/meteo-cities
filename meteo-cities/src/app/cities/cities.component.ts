import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeteodataService } from '../shared/meteodata.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {

  cities: {name: string, code: string}[] = [];
  city: {name: string, code: string}

  constructor(private meteodataService: MeteodataService, 
              private router: Router) { }

  ngOnInit(){
    this.cities = this.meteodataService.cities.default;
    
  }

  getCityForecast(cityname: string){
    this.router.navigate(['city', cityname]);
  }

}