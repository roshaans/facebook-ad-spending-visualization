// import { dataframe, DataframeModule } from 'dataframe-js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
// import {MatListModule} from '@angular/material/list';
import {GoogleChartsComponent} from './google-charts/google-charts.component'
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { GoogleChartsModule } from 'angular-google-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataForCandidates } from './data-for-candidates';
import { ChartTwoComponent } from './chart-two/chart-two.component';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GoogleChartsComponent,
    ChartTwoComponent
  ],
  imports: [
    MultiSelectModule,
    SliderModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    GoogleChartsModule.forRoot('AIzaSyDrOfgkGUtcfoM2ctSn-2bE47FyuSSj6gk'),
    MatSelectModule,MatNativeDateModule,MatDatepickerModule,MatInputModule,MatSliderModule,MatToolbarModule ],
  exports: [
   MatSelectModule,MatListModule,MatDatepickerModule,MatSliderModule,MatToolbarModule,MatCardModule
  ],
  providers: [DataForCandidates],
  bootstrap: [AppComponent]
})
export class AppModule { }
