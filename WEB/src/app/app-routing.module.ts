import { HistoryDateFromToComponent } from './main-view/history-date-from-to/history-date-from-to.component';
import { MainViewComponent } from './main-view/main-view/main-view.component';
import { DashboardComponent } from './main-view/dashboard/dashboard.component';
import { AuthGuard } from './users/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Route, CanActivate } from '@angular/router';
import { LoginFormComponent } from './users/login-form/login-form.component';
import { HistoryComponent } from './main-view/history/history.component';
import { HistoryDateComponent } from './main-view/history-date/history-date.component';
import { AdminGuard } from './users/admin.guard';
import { UserManagerComponent } from './users/user-manager/user-manager.component';
import { AdduserComponent } from './users/user-manager/adduser/adduser.component';

const APP_ROUTES: Route[] = [
    {
        path: '',
        component: LoginFormComponent
    },
    {
        path: 'mv',
        component: MainViewComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'history',
            component: HistoryComponent
          },
          {
            path: 'historyDate',
            component: HistoryDateComponent
          },
          {
            path: 'historyDateFromTo',
            component: HistoryDateFromToComponent
          },
          {
            path: 'userManager',
            component: UserManagerComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'addUser',
            component: AdduserComponent,
            canActivate: [AdminGuard]
          }
        ]
    },
    {
      path: '404',
      component: MainViewComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: '/mv/dashboard',
      canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
