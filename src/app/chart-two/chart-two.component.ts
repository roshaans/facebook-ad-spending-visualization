import { DataForCandidates } from './../data-for-candidates';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
 
@Component({
  selector: 'app-chart-two',
  templateUrl: './chart-two.component.html',
  styleUrls: ['./chart-two.component.css']
})
export class ChartTwoComponent implements OnInit {
  @Input() chartData;
  @Input() chartTitle: string;
  data: DataForCandidates[];  
  interval: any;
  maxNumber = this.candidateDataGlobal.maxVal 

  myOptions = {
    region: 'US',
    // sizeAxis: { minValue: 0, maxValue: 1000000 },
    displayMode: 'regions',
    resolution: 'provinces',
    legend:{textStyle: {color: 'blue', fontSize: 16}},
    showLegend: 'true',
    colorAxis: {colors: ['#fefed5', '#cc4c01'],
    minValue: 0, maxValue: this.maxNumber
  }

    };

  chart = {'title': this.chartTitle, 'type': 'GeoChart','data': this.candidateDataGlobal.newchartData[1],   'columnNames':[] ,'options': this.myOptions, 
  }


  constructor( private candidateDataGlobal: DataForCandidates) {
    // this.maxNumber = this.candidateDataGlobal.maxVal 

   }
   setData(maxNumber = this.maxNumber) {
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
    // this.myOptions.colorAxis.maxValue = this.maxNumber

    this.chart = {'title': this.chartTitle, 'type': 'GeoChart', 'data': this.candidateDataGlobal.newchartData[1],'columnNames':['State','amount'] ,'options': this.myOptions
  }
}
  ngOnInit(): void {
    this.setData(this.maxNumber)

   
     
  }
 
 


}
