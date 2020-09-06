import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';

const routes: Routes = [
  { path: '', component: DriversListComponent },
  { path: 'driver/:driverId', component: DriverProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
