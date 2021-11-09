import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-sum-scan-klodas',
  templateUrl: './sum-scan-klodas.component.html',
  styleUrls: ['./sum-scan-klodas.component.css']
})
export class SumScanKlodasComponent implements OnInit, OnDestroy {

  @Input() refresh;

  private timeSub: AnonymousSubscription;

  constructor(private dashboardService: DashboardService) { }

  _iloscKlod: number;

  ngOnInit() {
    this.loadIlsocKlod();
  }

  ngOnDestroy() {
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }

  loadIlsocKlod() {
    this.dashboardService.getSumScans().subscribe((ilosc) => {
      this._iloscKlod = ilosc;
      this.refreshData();
    });
  }

  refreshData() {
    this.timeSub = Observable.timer(5000).first().subscribe(() => {
      if (this.refresh) {
        this.loadIlsocKlod();
      }
      if (!this.refresh) {
        this.refreshData();
      }
    });
  }

}
