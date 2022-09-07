import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WeatherService } from "../services/weather.service";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html", 
  styleUrls: ["./details-page.component.css"]
})
export class DetailsPageComponent implements OnInit {
  public nextCoupleOfDaysReports$!: Observable<any>;
  displayedColumns: string[] = ["date", "temperature", "sea_level","humidity"];

  public loader = false;
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.loader = true;
  }

  ngOnInit(): void {

    console.log(this.route.snapshot.params.name,'this.route.snapshot.params.name');
    this.nextCoupleOfDaysReports$ = this.weatherService
      .noOfDaysReport(this.route.snapshot.params.name)
      .pipe(
        map((res: any) => {
          this.loader = false;
          return res.noOfDays;
        })
      );
  }
}
