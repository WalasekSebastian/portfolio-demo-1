import { HistoryDateFromToService } from './main-view/history-date-from-to.service';
import { HistoryDateService } from './main-view/history-date.service';
import { HistoryService } from './main-view/history.service';
import { MainViewModule } from './main-view/main-view.module';
import { AuthGuard } from './users/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserService } from './users/user.service';
import { LoginFormComponent } from './users/login-form/login-form.component';
import { HttpModule } from '@angular/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardService } from './main-view/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE, MatCardModule, MatSnackBar, MatSnackBarModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { AdminGuard } from './users/admin.guard';
import { UserManagerService } from './users/user-manager.service';
import { UserManagerComponent } from './users/user-manager/user-manager.component';
import { AdduserComponent } from './users/user-manager/adduser/adduser.component';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserManagerComponent,
    AdduserComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MainViewModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    UserService,
    DashboardService,
    HistoryService,
    HttpClientModule,
    HistoryDateService,
    HistoryDateFromToService,
    UserManagerService,
    MatSnackBar,
    AuthGuard,
    AdminGuard,
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}
  ],
  entryComponents: [
    ConfirmDialogComponent,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
