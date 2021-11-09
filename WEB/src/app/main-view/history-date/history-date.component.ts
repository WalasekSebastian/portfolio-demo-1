import { SumBoxes } from '../models/sum-boxes';
import { HistoryDateService } from '../history-date.service';
import { Component, Input, forwardRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-date',
  templateUrl: './history-date.component.html',
  styleUrls: ['./history-date.component.css']
})

export class HistoryDateComponent implements OnInit {

  iloscMetrow: number;
  iloscKlod: number;
  _sumBox: SumBoxes;
  _sumIlosc: SumBoxes;

  date;

  constructor(private dateService: HistoryDateService) { }

  ngOnInit() {
  }

  dateInput(date: any) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.date = `${year}-${month}-${day}`;
    this.refresh();
  }

  refresh() {
    this.loadIloscKlod();
    this.loadIloscMetrow();
    this.loadSumMetryBoxes();
    this.loadSumIloscBoxes();
  }

  loadIloscMetrow() {
    this.dateService.getIloscMetrow(this.date).subscribe((param) => {
      this.iloscMetrow = param;
    });
  }

  loadIloscKlod() {
    this.dateService.getIloscKlod(this.date).subscribe((param) => {
      this.iloscKlod = param;
    });
  }

  loadSumMetryBoxes() {
    this.dateService.getSumMetryBoxes(this.date).subscribe((sumBox) => {
      this._sumBox = sumBox;
    });
  }

  loadSumIloscBoxes() {
    this.dateService.getSumIloscBoxes(this.date).subscribe((sumBox) => {
      this._sumIlosc = sumBox;
    });
  }
}
