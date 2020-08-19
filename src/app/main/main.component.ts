import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChartTwoComponent } from './../chart-two/chart-two.component';
import { GoogleChartsComponent } from '../google-charts/google-charts.component'
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../get-data.service'
import { Component, ViewChild, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms'
import * as Moment from 'moment';
import { DataFrame } from 'dataframe-js';
import { Observable } from 'rxjs'; // Angular 6
import { DataForCandidates } from '../data-for-candidates';

declare var isItMobile: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(GoogleChartsComponent) chartOne;
  @ViewChild(ChartTwoComponent) chartTwo;



  // Form Control Variables
  regionalSpending = new FormControl();

  // date Object that has current Date
  date = new FormControl(new Date());

  // Selected Start Date from form
  startDate = new FormControl(new Date(2019, 11, 22));
  // Selected End Date from form
  endDate = new FormControl(new Date(2020, 5, 10));


  // List of presidential candidates
  presidentialCandidatesList = [{ name: 'Joe Biden', party: 'Democratic' }, { name: 'Cory Booker', party: 'Democratic' }, { name: 'Pete Buttigieg', party: 'Democratic' }, { name: 'Amy Klobuchar', party: 'Democratic' }, { name: 'Andrew Yang for President 2020', party: 'Democratic' }, { name: 'Bernie Sanders', party: 'Democratic' }, { name: 'Tom Steyer', party: 'Democratic' }, { name: 'Elizabeth Warren', party: 'Democratic' }, { name: 'Donald J. Trump', party: 'Republican' }]


  // maps the appropriate column to fields property
  public fields: Object = { text: 'name', value: 'name', groupBy: 'party' };
  // Show/Hide first graph
  firstGraphShow = true;
  // Show/Hide second graph
  secondGraphShow = true;

  // minimum Date for Selection Date Box
  minDate = Moment('2019-10-20', 'YYYY-MM-DD');
  // maximum Date for Selection Date Box
  maxDate = Moment('2020-05-10', 'YYYY-MM-DD');
  // Keeps track of Slider Value to change week
  sliderValue = 12;

  // Title to pass in with Google chart Component
  title = ''

  placeholder = 'Select Presidential Candidates'
  public mode: string;
  public maximumSelectionLength;

  dateRange: any


  // Value to display at the start of Slider
  startDateVal = Moment(this.minDate).format('MMMM Do YYYY');
  // Value to display at the end of Slider
  endDateVal = Moment(this.maxDate).format('MMMM Do YYYY');

  // Selected Candidates
  selected: string[];

  // Contains candidate data ready to be analyzed
  candidateData: any;

  noDataForSecondCandidate = false;
  noDataForFirstCandidate = false;
  chartData = []

  totalSpendingForCandidateOne = 0;
  totalSpendingForCandidateTwo = 0;


  sliderDate = this.startDateVal;

  public startDateFromSlider = this.minDate
  public endDateFromSlider = this.minDate.add(7, 'days')

  // Configuring timeline slider
  public rangetype = 'Range';
  public showButtons = true;
  public mintime = 0;
  public maxtime: number = this.maxDate.diff(this.minDate, 'days')
  public steptime = 7;
  public timevalue: number[] = [this.maxDate.diff(this.minDate, 'days') * 2 / 4, this.maxDate.diff(this.minDate, 'days') * 3 / 4];

  public timetooltip: Object = {
    placement: 'Before',
    isVisible: true,
    showOn: 'Always'
  };

  public timeticks: Object = {
    placement: 'After',
    largeStep: 21,
    smallStep: 7,
    showSmallTicks: true
  };

  disableTimeline = true;
  // check if Mobile device or desktop
  isMobile = false;
  public innerWidth: any;


  // Used to adjust the color scales for each comparision
  maxCandidateOne = {max: 0, state: ''} ;
  maxCandidateTwo = {max: 0, state: ''} ;

  // max state and money
  maxStateCandiateOne: any;
  maxStateCandiateTwo: any;

  renderingTicks(args) {
    this.minDate = Moment('2019-10-20', 'YYYY-MM-DD');
    this.maxDate = Moment('2020-05-10', 'YYYY-MM-DD');

    const newDate = this.minDate
    // Customizing each ticks text into days

    args.text = newDate.add(args.value, 'days').format('MMM Do YY')
  }

  tooltipChange(args) {
    // Set min and max date again to ensure they dont change
    this.minDate = Moment('2019-10-20', 'YYYY-MM-DD');
    this.maxDate = Moment('2020-05-10', 'YYYY-MM-DD');
    // Create a new date variable
    let newDate = this.minDate
    // Split them up so that we can extract the first circle and last circle value
    const totalDate: string[] = args.text.split(' ');

    // first value
    let firstPart: string = totalDate[0]
    // second value
    let lastPart: string = totalDate[2]

    // Turn first part "x" into a date by adding x days to minimum date
    firstPart = newDate.add(firstPart, 'days').format('MMMM Do YYYY')
    // configure minDate so that max date does not mess up
    this.minDate = Moment('2019-10-20', 'YYYY-MM-DD');
    newDate = this.minDate
    lastPart = newDate.add(lastPart, 'days').format('MMMM Do YYYY')

    // Assigning our custom text to the tick value.
    args.text = firstPart + ' - ' + lastPart
    this.dateRange = args.text
    // Make slider dates
    this.startDateFromSlider = Moment(firstPart, 'MMMM Do YYYY');
    this.endDateFromSlider = Moment(lastPart, 'MMMM Do YYYY');


  }


  constructor(public service: GetDataService, private candidateDataGlobal: DataForCandidates) {


  }

  @HostListener('window:resize', ['$event'])
  // if(this.isMobile == alse)
  onResize(event) {
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth)

    if(this.innerWidth < 690){
        this.timeticks = {
          placement: 'After',
          largeStep: 42,
          smallStep: 7,
          showSmallTicks: true
        }
      }
      if(this.innerWidth < 690){
        this.timeticks = {
          placement: 'After',
          largeStep: 42,
          smallStep: 7,
          showSmallTicks: true
        }
      }

      if (this.innerWidth < 300){
        this.timeticks = {
          placement: 'None',

        }
      }

  }
  // Extract the CSV file and turn into dataframe to get ready for analysis
  getDataInDataFrame() {
    DataFrame.fromCSV(
      './assets/candidate_spend_by_state.csv'
    )
      .then(df => {

        this.candidateData = df
      })



  }

  ngOnInit(): void {
    // set the type of mode for checkbox to visualized the checkbox added in li element.
    // Sets limitation to the value selection
    this.maximumSelectionLength = 2;
    this.getDataInDataFrame()
    // Check to see if it is on a mobile device to narrow the time ticks
    this.isMobile = new isItMobile();

    // Change time ticks range
    if (this.isMobile == true) {

      this.timeticks = {
        placement: 'After',
        largeStep: 42,
        smallStep: 7,
        showSmallTicks: true
      };
    }
    this.innerWidth = window.innerWidth;

  }



  getData() {
    // Reset max
    this.maxCandidateOne = {max: 0, state: ''}
    this.maxCandidateTwo = {max: 0, state: ''}
    // Reset max
    let meanCandidateOne = 0
    let meanCandidateTwo = 0
    // reset Total Spending
    this.totalSpendingForCandidateOne = 0
    this.totalSpendingForCandidateTwo = 0
    // Query Selected Candidates data on a relevent date.
    const candidateOne: any = this.candidateData.filter(row => row.get('page_name') == this.selected[0])
    const candidateOneWithDatRange = candidateOne.filter(row => (Moment(row.get('date')).valueOf() >= this.startDateFromSlider.valueOf()) && (Moment(row.get('date')).valueOf() <= this.endDateFromSlider.valueOf()))
    const candidateOneFilteredWithAggregate: any = candidateOneWithDatRange.select('region', 'amt_spent').groupBy('region').aggregate((group) => group.stat.sum('amt_spent')).rename('aggregation', 'amt_spent').cast('amt_spent', Number)
    const candidateOneFilteredWithRegion: any = candidateOneFilteredWithAggregate.toArray()
    meanCandidateOne = candidateOneFilteredWithAggregate.stat.max('amt_spent')
    console.log(meanCandidateOne, 'meanCandOne')
    const candOne = candidateOneFilteredWithAggregate.select('amt_spent', 'region').toArray()
    // Add total
    candOne.forEach(element => {
      this.totalSpendingForCandidateOne += element[0]
      if( element[0] > this.maxCandidateOne.max ){
        this.maxCandidateOne.max = element[0]
        this.maxCandidateOne.state = element[1]
      }

    });


    this.candidateDataGlobal.newchartData[0] = candidateOneFilteredWithRegion
    // this.chartData[0] = candidateOneFilteredWithRegion;
    if (this.candidateDataGlobal.newchartData[0].length == 0) {
      this.noDataForFirstCandidate = true;
    } else {
      this.noDataForFirstCandidate = false;
    }

    if (this.selected.length > 1) {
      const candidateTwo: any = this.candidateData.filter(row => row.get('page_name') == this.selected[1])
      const candidateTwoWithDateRange = candidateTwo.filter(row => (Moment(row.get('date')).valueOf() >= this.startDateFromSlider.valueOf()) && (Moment(row.get('date')).valueOf() <= this.endDateFromSlider.valueOf()))
      const candidateTwoFilteredWithAggregate: any = candidateTwoWithDateRange.select('region', 'amt_spent').groupBy('region').aggregate((group) => group.stat.sum('amt_spent')).rename('aggregation', 'amt_spent').cast('amt_spent', Number)
      const candidateTwoFilteredWithRegion = candidateTwoFilteredWithAggregate.toArray()
      const candTwo = candidateTwoFilteredWithAggregate.cast('amt_spent', Number).select('amt_spent', 'region').toArray()
      meanCandidateTwo = candidateTwoFilteredWithAggregate.union(candidateOneFilteredWithAggregate).stat.mean('amt_spent')
      console.log('CombinedDataFrameMean', meanCandidateTwo)
      // meanCandidateTwo = candidateTwoFilteredWithAggregate.stat.mean("amt_spent")
      console.log(meanCandidateTwo, 'meanCandidateTwo')

      // Add total
      candTwo.forEach(element => {
        this.totalSpendingForCandidateTwo += element[0]
        if(element[0] > this.maxCandidateTwo.max  ){
          this.maxCandidateTwo.max = element[0]
          this.maxCandidateTwo.state = element[1]

        }
      });

       this.candidateDataGlobal.newchartData[1] = candidateTwoFilteredWithRegion
      // this.chartData[1] = candidateTwoFilteredWithRegion;


      if (this.candidateDataGlobal.newchartData[1].length == 0) {
        this.noDataForSecondCandidate = true;
      } else {

        this.noDataForSecondCandidate = false;
      }

    }

    let meanFromBothCandidtates = meanCandidateOne
    this.candidateDataGlobal.maxVal = meanFromBothCandidtates

    // var maxAmountFromBothCandidateData = Math.max(this.maxCandidateOne, this.maxCandidateTwo)
    // console.log(maxAmountFromBothCandidateData, "maxAmountFromBothCandidateData")
    // console.log(this.candidateDataGlobal.newchartData[1].length, "length of second")
    // console.log(this.candidateDataGlobal.newchartData[0].length, "data0")
    // console.log(this.candidateDataGlobal.newchartData[1].length, "data1")


      if (this.selected.length > 1) {
         meanFromBothCandidtates = meanCandidateTwo
        this.candidateDataGlobal.maxVal = meanFromBothCandidtates
        this.chartTwo.setData(meanFromBothCandidtates)

    }
    this.chartOne.setData(meanFromBothCandidtates)




  }

  changeSlider(event) {
    this.startDateVal = Moment(this.startDate.value).format('MMMM Do YYYY')
    this.endDateVal = Moment(this.endDate.value).format('MMMM Do YYYY')

    const momentObject = Moment(event.value)


  }
  startDayChanged() {
    this.startDateVal = Moment(this.startDate.value).format('MMMM Do YYYY')
    this.endDateVal = Moment(this.endDate.value).format('MMMM Do YYYY')

    // update data
    this.getData()
  }

  selectedObject(args) {
    this.selected = args.value
    this.changed()
  }

  // When timeline is changed
  changed() {
    // More than 2 Candidates Selected
    if (this.selected.length > 2) {
    }

    if (this.selected.length > 0) {
      this.disableTimeline = false
    }

    this.GraphDisplay()

    // Update chart Component data
    this.getData()

  }

  // Display one or two graph logic
  GraphDisplay() {
    if (this.selected.length == 1) {

      this.firstGraphShow = false;
      this.secondGraphShow = true;

    }

    if (this.selected.length == 2) {
      this.firstGraphShow = false;

      this.secondGraphShow = false;

    }
    if (this.selected.length == 0) {

      this.firstGraphShow = true;
      this.secondGraphShow = true;


    }
  }


  sliderChanged(event) {
    // this.addWeek(event)
    this.getData()
  }

  addWeek(sliderVal: number) {

    this.sliderDate = Moment(this.minDate, 'MMMM Do YYYY').add(7 * sliderVal, 'days').format('MMMM Do YYYY')


  }

}

