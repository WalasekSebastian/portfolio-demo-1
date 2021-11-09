import { AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../dashboard.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-sum-meters',
  templateUrl: './sum-meters.component.html',
  styleUrls: ['./sum-meters.component.css']
})
export class SumMetersComponent implements OnInit, OnDestroy {

  @Input() refresh;

  ilosc: number;
  private timeSub: AnonymousSubscription;

  constructor(private dashboardService: DashboardService) {
    this.ilosc = 0;
  }

  ngOnInit() {
    this.loadIloscMetrow();
  }

  ngOnDestroy() {
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }

  loadIloscMetrow() {
    this.dashboardService.getIloscMetrow().subscribe((param) => {
      this.ilosc = param;
      this.refreshData();
    });
  }

  refreshData() {
    this.timeSub = Observable.timer(5000).first().subscribe(() => {
      if (this.refresh) {
        this.loadIloscMetrow();
      }
      if (!this.refresh) {
        this.refreshData();
      }
    });
  }

}
