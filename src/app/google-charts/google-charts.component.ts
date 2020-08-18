import { DataForCandidates } from './../data-for-candidates';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-charts',
  templateUrl: './google-charts.component.html',
  styleUrls: ['./google-charts.component.css']
})
export class GoogleChartsComponent implements OnInit {
 @Input() chartData;
 @Input() chartTitle: string;
 data: DataForCandidates[];
 dataAfterRunning: any;
 interval: any;
 maxNumber = this.candidateDataGlobal.maxVal

  // Options for GeoChart apperance
  myOptions: any = {
    // sizeAxis: { minValue: 0, maxValue: 1000000 },
    region: 'US',
    displayMode: 'regions',
    resolution: 'provinces',
    legend:{textStyle: {color: 'blue', fontSize: 16}},
    showLegend: 'true',


    colorAxis: {
      minValue: 0, maxValue: this.maxNumber,
      colors: ['#fefed5', '#cc4c01']}
    };

  chart = {title: this.chartTitle, type: 'GeoChart',data:  this.candidateDataGlobal.newchartData[0],   columnNames:[] ,options: this.myOptions,
  }


  constructor(private httpClient: HttpClient, private candidateDataGlobal: DataForCandidates) {
  }

   setData(maxNumber = this.maxNumber) {
    // this.maxNumber = max
    //  this.myOptions.colorAxis.maxValue = this.maxNumber
    this.myOptions = {
      region: 'US',
      // sizeAxis: { minValue: 0, maxValue: 1000000 },
      displayMode: 'regions',
      resolution: 'provinces',
      legend:{textStyle: {color: 'blue', fontSize: 16}},
      showLegend: 'true',
      colorAxis: {colors: ['#fefed5', '#cc4c01'],
      minValue: 0, maxValue: maxNumber
    }

      };
    this.chart = {title: this.chartTitle, type: 'GeoChart', data:  this.candidateDataGlobal.newchartData[0],columnNames:['State','amount'] ,options: this.myOptions}
}
  ngOnInit(): void {
    this.setData(this.maxNumber)



  }




}
