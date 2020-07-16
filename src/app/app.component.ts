import { HttpClient } from "@angular/common/http";

import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataframe: any;

  csvRecords: any[] = [];
  header = false;
  title = 'regional-spending-interface';


  
 
  constructor(
    private http: HttpClient) { 

    // this.http.get('../assets/candidate_spend_by_state.csv', {responseType: 'text'})
    // .subscribe(
    //     data => {
    //         let csvToRowArray = data.split("\n");
    //         for (let index = 1; index < csvToRowArray.length - 1; index++) {
    //           let row = csvToRowArray[index].split(",");
    //           // this.userArray.push(new User( parseInt( row[0], 10), row[1], row[2].trim()));
    //         }
    //          console.log(csvToRowArray);
    //          var newArr = this.CSVToArray(data, ",");
    //          console.log(newArr)
    //         //  const columns = ["page_name", "date", "region", "amt_spent"];
    //         //  const df = new Dataframe(data, columns);
    //     },
    //     error => {
    //         console.log(error);
    //     }
    // );
  }


  
}
 