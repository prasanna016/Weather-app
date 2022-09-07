import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  public getCities(
    cnt: number,
    lat: number,
    lon: number
  ): Observable<
    {
      name: string;
      temp: string;
      sunrise: number;
      sunset: number;
    }[]
  > {
    return this.http
      .get(
        `${environment.apiUrl}/find?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${
          environment.apiKey
        }`
      )
      .pipe(
        map((response: any) => response.list),
        map(lists => {
          
          return lists.map((list: any) => list.name);
          
        }),
        switchMap(itemNames => {
          return forkJoin([

            ...itemNames.map((itemName: any) => {
              return this.getWeatherReport(itemName);
            })
          ]);
        }),
        map(
          comnbinedInfo =>
            comnbinedInfo as {
              name: string;
              temp: string;
              sunrise: number;
              sunset: number;
            }[]
        )
      );
  }

  public getWeatherReport(
    city: string
  ): Observable<{
    name: string;
    temp: string;
    sunrise: number;
    sunset: number;
  }> {
    return this.http
      .get(
        `${environment.apiUrl}/weather?q=${city}&appid=${environment.apiKey}`
      )
      .pipe(
        map((response: any) => {
          return {
            name: response.name,
            temp: (parseFloat(response.main.temp) - 250.15).toFixed(2),
            sunrise: response.sys.sunrise * 1000, // converting to milliseconds
            sunset: response.sys.sunset * 1000
          };
        })
      );
  }

  public noOfDaysReport(
    name: string,
    cnt = 40
  ): Observable<{
    main: string;
    noOfDays: {
      date: number;
      dateString: string;
      temperature: string;
      seaLevel: number;
      humidity: number;
    }[];
  }> {
    return this.http
      .get(
        `${environment.apiUrl}/forecast?q=${name}&appid=${
          environment.apiKey
        }&cnt=${cnt}`
      )
      .pipe(
        map((response: any) => ({
          main: response.city,
          noOfDays: response.list
            .map((result: any) => {
              if (result.dt_txt.indexOf("21:00:00") === -1) {
                return;
              }
              return {
                date: result.dt,
                dateString: result.dt_txt,
                temperature: (parseFloat(result.main.temp) - 273.15).toFixed(2),
                seaLevel: result.main.sea_level,
                humidity: result.main.humidity
              };
            })
            .filter((validData: any) => !!validData)
        }))
      );
  }
}
