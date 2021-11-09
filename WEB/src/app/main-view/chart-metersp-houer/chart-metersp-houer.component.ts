import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { ChartService } from '../chart.service';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chart-metersp-houer',
  templateUrl: './chart-metersp-houer.component.html',
  styleUrls: ['./chart-metersp-houer.component.css']
})
export class ChartMeterspHouerComponent implements OnInit, OnChanges, OnDestroy {

  @Input() date;
  @Input() refresh;

  private timeSub: AnonymousSubscription;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: any[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [1, 2], label: 'm3'}
  ];

  constructor(private charDataService: ChartService) { }

  ngOnInit() {
    this.loadChartData();
  }

  ngOnDestroy() {
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const dat: SimpleChange = changes.date;
    this.loadChartData();
  }

  loadChartData() {
    this.charDataService.getChartData(this.date).subscribe((param) => {
      this.barChartData = [
        {data: param.data, label: 'm3'}
      ];
      this.barChartLabels.length = 0;
      for (let i = 0; i <= param.godz.length - 1; i++) {
        this.barChartLabels.push(param.godz[i]);
      }
      this.refreshData();
    });
  }

  refreshData() {
    this.timeSub = Observable.timer(10000).first().subscribe(() => {
      if (this.refresh) {
        this.loadChartData();
      }
      if (!this.refresh) {
        this.refreshData();
      }
    });
  }

}
