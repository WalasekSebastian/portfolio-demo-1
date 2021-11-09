import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { UstawieniaBoksow } from '../../models/ustawienia-boksow';
import { DashboardService } from '../../dashboard.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-last-setting-box',
  templateUrl: './last-setting-box.component.html',
  styleUrls: ['./last-setting-box.component.css']
})
export class LastSettingBoxComponent implements OnInit, OnDestroy {

  @Input() refresh;

  private timeSub: AnonymousSubscription;
  lastUB: UstawieniaBoksow;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.lastUstawieniaBoksow();
  }

  ngOnDestroy() {
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }

  lastUstawieniaBoksow() {
    this.dashboardService.getLastUstawianiaBoskow().subscribe((ustawienia) => {
      this.lastUB = ustawienia[0];
      this.refreshData();
    });
  }

  refreshData() {
    this.timeSub = Observable.timer(5000).first().subscribe(() => {
      if (this.refresh) {
        this.lastUstawieniaBoksow();
      }
      if (!this.refresh) {
        this.refreshData();
      }
    });
  }

}
