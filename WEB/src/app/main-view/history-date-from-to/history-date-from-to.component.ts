import { DateFromTo } from '../models/date-from-to';
import { HistoryDateFromToService } from '../history-date-from-to.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-history-date-from-to',
  templateUrl: './history-date-from-to.component.html',
  styleUrls: ['./history-date-from-to.component.css']
})
export class HistoryDateFromToComponent implements OnInit {

  displayedColumns = ['data', 'sumaM3', 'sumaM3Trak', 'sumaKlod', 'sumaKlodTrak'];
  dataSource: MatTableDataSource<DateFromTo>;
  _dateFrom;
  _dateTo;

  constructor(private dateService: HistoryDateFromToService) { }

  ngOnInit() {
  }

  loadHistory(dateFrom, dateTo) {
    this.dateService.getHistory(dateFrom, dateTo).subscribe((param) =>
    this.dataSource = new MatTableDataSource<DateFromTo>(param));
  }

  dateInput(date: any) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  dateFrom(date: any) {
    this._dateFrom = this.dateInput(date);
  }

  dateTo(date: any) {
    this._dateTo = this.dateInput(date);
  }

  showHistory() {
    this.loadHistory(this._dateFrom, this._dateTo);
  }

}
