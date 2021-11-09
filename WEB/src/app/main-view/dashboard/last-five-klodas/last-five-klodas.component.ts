import { Observable } from 'rxjs/Observable';
import { Kloda } from '../../models/kloda';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AnonymousSubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-last-five-klodas',
  templateUrl: './last-five-klodas.component.html',
  styleUrls: ['./last-five-klodas.component.css']
})
export class LastFiveKlodasComponent implements OnInit, OnDestroy {

  @Input() refresh;

  displayedColumns = ['boks_nr', 'srednica_min_mm', 'objetosc_m3', 'dlugosc_mm', 'czas_pomiaru'];
  dataSource: MatTableDataSource<Kloda>;
  private timeSub: AnonymousSubscription;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.loadLastFive();
  }

  ngOnDestroy() {
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }

  loadLastFive() {
    this.dashboardService.getLastFiveKloda().subscribe((klodas) => {
      this.dataSource = new MatTableDataSource<Kloda>(klodas);
      this.refreshData();
    });
  }

  refreshData() {
    this.timeSub = Observable.timer(5000).first().subscribe(() => {
      if (this.refresh) {
        this.loadLastFive();
      }
      if (!this.refresh) {
        this.refreshData();
      }
    });
  }

}
