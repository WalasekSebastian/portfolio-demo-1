import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { SumBoxes } from '../../models/sum-boxes';

@Component({
  selector: 'app-sum-klodas-box',
  templateUrl: './sum-klodas-box.component.html',
  styleUrls: ['./sum-klodas-box.component.css']
})
export class SumKlodasBoxComponent implements OnInit, OnDestroy {

  @Input() refresh;

  _sumBox: SumBoxes;
  private timeSub: AnonymousSubscription;

  constructor(private dashboard: DashboardService) { }

  ngOnInit() {
    this.loadSumBoxes();
  }

  ngOnDestroy() {
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }

  loadSumBoxes() {
    this.dashboard.getSumBoxes().subscribe((sumBox) => {
      this._sumBox = sumBox;
      this.refreshData();
    });
  }

  refreshData() {
    this.timeSub = Observable.timer(5000).first().subscribe(() => {
      if (this.refresh) {
        this.loadSumBoxes();
      }
      if (!this.refresh) {
        this.refreshData();
      }
    });
  }

}
