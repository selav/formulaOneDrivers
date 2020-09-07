import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { DriverProfileItem } from './driverProfileItem';
import { DriversService } from '../services/drivers.service';
import { GoogleAuthService } from '../services/google-auth.service';

@Component({
  selector: 'app-driver-profile',
  template: `
  <ng-container *ngIf ="driverProfile$" >
    <app-like-button [driverId]="driverId"></app-like-button>
  </ng-container>
  <div class="table-wrapper mat-elevation-z8">
      <table mat-table [dataSource]="driverProfile$ | async" class="full-width-table" aria-label="Elements">
        <ng-container *ngFor="let col of displayedObjects" [matColumnDef]='col.name'>
          <th mat-header-cell *matHeaderCellDef >{{col.title}}</th>
          <td mat-cell *matCellDef="let row" >{{row[col.name]}}</td>
        </ng-container>  
        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    

    </div>
  `,
  styles: [`
  .full-width-table {
    width: 100%;
  }
  .table-wrapper {
    margin: 0 5%;
    height: calc(100vh - 150px);
    overflow: auto;
  }
  
`]
})
export class DriverProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private driversService:DriversService,
    private authService:GoogleAuthService,
  ) { }

  driverId:Number;
  
  driverProfile$: Observable<DriverProfileItem[]>;

  displayedObjects = [
    {name:"race.race_id", title:"Race Id"},
    {name:"race.name", title:"Race"},
    {name:"race.date", title:"Date"},
    {name:"min_lap_time", title:"Min Lap Time"},
    {name:"max_lap_time", title:"Max Lap Time"},
    {name:"pit_stops_num", title:"Pit Stops Number"},
    {name:"pit_stops_min", title:"Fastest Pit Stops"},
    {name:"pit_stops_max", title:"Slowest Pit Stops"},
    {name:"circuit_name", title:"Circuit"},
    {name:"points", title:"Points"},
    {name:"position_text", title:"Position"},

  ];

  displayedColumns = this.displayedObjects.map(obj=>obj.name)


  async ngOnInit() {
    
 

    this.driverId = this.route.snapshot.params.driverId;

    this.driverProfile$ = this.driversService.getDriver(this.driverId).pipe(tap(r=>console.log(r)));


  }

}
