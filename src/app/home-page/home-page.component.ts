import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { WeatherService } from "../services/weather.service";


interface Country {
  name: string;
  lat: number;
  lon: number;
}


@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  public weatherItes$!: Observable<any>;


  public selectedValue: string | undefined;


  country: Country[] = [
  
    {name: 'Argentina', lat:38.4161, lon:63.6167},
    {name: 'Bangalore',lat:12.9716,lon: 77.5946},
    {name: 'Chennai',lat:13.0827,lon:80.2707},
    {name: 'Delhi',lat:28.7041,lon:77.1025},
    {name: 'India', lat: 20.5937, lon:78.9629},
    {name: 'SriLanka', lat: 7.8731, lon: 80.7718}
   
   

  ];

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
 
  }

  getCityByCountry(value: any): void{
  
    const index = this.country.findIndex(item => item.name === value);
    this.weatherItes$ = this.weatherService.getCities(5,this.country[index].lat,this.country[index].lon).pipe(
      tap(() => {
        
      })
    );
  }
}
