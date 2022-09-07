import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { WeatherService } from './services/weather.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {  MatSelectModule } from '@angular/material/select';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		DetailsPageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		MatGridListModule,
		MatIconModule,
		MatCardModule,
    	MatSelectModule,
		MatTooltipModule,
		MatTableModule,
		NoopAnimationsModule,
		MatButtonModule,
		MatProgressBarModule
	],
	providers: [WeatherService],
	bootstrap: [AppComponent]
})
export class AppModule { }
