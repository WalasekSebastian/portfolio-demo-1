import { Http } from '@angular/http';
import { GlobalVariable } from '../../app-var';
import {MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material';
import { HistoryService } from '../history.service';
import { Kloda } from '../models/kloda';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Console } from '@angular/core/src/console';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KlodaApi } from '../models/kloda-api';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { HistoryPerDay } from '../models/historyPerDay';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements AfterViewInit {

  displayedColumns = ['id', 'boks_nr', 'srednica_min_mm', 'objetosc_m3', 'dlugosc_mm', 'czas_pomiaru'];
  dataSource = new MatTableDataSource();
  dataSourceDates = new MatTableDataSource();
  dataSourcePerDay = new MatTableDataSource();
  isOk: boolean;
  resultLenght = 0;
  isLoadingResults = true;
  renderedData: any;
  _dateFrom;
  _dateTo;
  dateTime1;
  dateTime2;
  dateForm: FormGroup = new FormGroup({
    dateFrom: new FormControl('', Validators.required),
    dateTo: new FormControl('', Validators.required)
  });

  options = {
    fieldSeparator: ';',
    quoteStrings: '',
    decimalseparator: ',',
    showLabels: true,
    showTitle: false,
    useBom: false,
    noDownload: false,
    headers: ["ID", "Boks", "srednica_min / max", "objetosc_m3", "dlugosc_mm", "czas_pomiaru"]
  };

  optionsPerDay = {
    fieldSeparator: ';',
    quoteStrings: '',
    decimalseparator: ',',
    showLabels: true,
    showTitle: false,
    useBom: false,
    noDownload: false,
    headers: ["Data", "Trak m3", "Trak ilosc", "Boks4 m3", "Boks4 ilosc", "Boks3 m3", "Boks3 ilosc",
    "Boks2 m3", "Boks2 ilosc","Boks1 m3", "Boks1 ilosc", "Ilosc m3", "Ilosc klod"]
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HistoryService) {
    this.isOk = true;

  }

  ngAfterViewInit() {

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        this.isOk = true;
        return this.http.getAllKlodas(this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
        this.isLoadingResults = false;
        this.resultLenght = data.totalCount;
        return data.items;
      }),
      catchError(() => {
        this.isOk = false;
        return observableOf([]);
      })
    ).subscribe(data => this.dataSource.data = data);
  }

  dateInput(date: any) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour <= 9) {
      hour = `0${hour}`;
    }
    if (minute <= 9) {
      minute = `0${minute}`;
    }
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  dateFrom(date: any) {
    if (date !== null) {
      this._dateFrom = this.dateInput(date);
    }
  }

  dateTo(date: any) {
    if (date !== null) {
      this._dateTo = this.dateInput(date);
    }

  }

  exportCsv() {
    this.http.getKlodasDates(this._dateFrom, this._dateTo).subscribe((param) => {
      this.dataSourceDates = new MatTableDataSource<Kloda>(param);
      this.dataSourceDates.connect().subscribe(d => this.renderedData = d);
      // tslint:disable-next-line:no-unused-expression
      new Angular5Csv(this.renderedData, 'Raport', this.options);
    });
    }

  exportCsvPerDay() {
    this.http.getHistoryPerDay(this._dateFrom, this._dateTo).subscribe((param) => {
      this.dataSourcePerDay = new MatTableDataSource<HistoryPerDay>(param);
      this.dataSourcePerDay.connect().subscribe(d => this.renderedData = d);
      // tslint:disable-next-line:no-unused-expression
      new Angular5Csv(this.renderedData, 'RaportPerDay', this.optionsPerDay);
    });
    }

}
