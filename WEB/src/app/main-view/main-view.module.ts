
import { AppRoutingModule } from '../app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModuleModule } from './core-module/core-module.module';
import { MainViewComponent } from './main-view/main-view.component';
import { MatTableModule,
          MatCardModule,
          MatDrawer,
          MatPaginatorModule,
          MatSortModule,
          MatIconModule,
          MatTooltipModule,
          MatCheckbox,
          MatCheckboxModule,
          MatDatepickerModule,
          MatFormFieldModule,
          MatNativeDateModule,
          MatSliderModule,
          MatSlideToggleModule,
          MatSnackBarModule} from '@angular/material';
import { LastFiveKlodasComponent } from './dashboard/last-five-klodas/last-five-klodas.component';
import { SumMetersComponent } from './dashboard/sum-meters/sum-meters.component';
import { LastSettingBoxComponent } from './dashboard/last-setting-box/last-setting-box.component';
import { SumKlodasBoxComponent } from './dashboard/sum-klodas-box/sum-klodas-box.component';
import { SumScanKlodasComponent } from './dashboard/sum-scan-klodas/sum-scan-klodas.component';
import { MatButtonModule } from '@angular/material/button';
import { HistoryComponent } from './history/history.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HistoryDateComponent } from './history-date/history-date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HistoryDateFromToComponent } from './history-date-from-to/history-date-from-to.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ChartsModule } from 'ng2-charts';
import { ChartMeterspHouerComponent } from './chart-metersp-houer/chart-metersp-houer.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModuleModule,
    MatTableModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    MainViewComponent,
    LastFiveKlodasComponent,
    SumMetersComponent,
    LastSettingBoxComponent,
    SumKlodasBoxComponent,
    SumScanKlodasComponent,
    HistoryComponent,
    HistoryDateComponent,
    HistoryDateFromToComponent,
    ChartMeterspHouerComponent
  ]
})
export class MainViewModule { }
