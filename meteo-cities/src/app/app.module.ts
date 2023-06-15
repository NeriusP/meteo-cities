import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { SkyconsModule } from 'ngx-skycons';


import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { ForecastComponent } from './forecast/forecast.component';
import { MeteodataService } from './shared/meteodata.service';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', component: CitiesComponent, children: [
     {path: 'city/:citycode', component: ForecastComponent}
  ]}, 
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
]


@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    ForecastComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [MeteodataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
