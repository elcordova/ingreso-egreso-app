import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {dashboardRouter} from './dashboard.routes';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: dashboardRouter,
  // canActivate: [AuthGuardService]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class DashboardRoutingModule {
}
