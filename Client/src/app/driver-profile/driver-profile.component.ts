import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DriverProfileItem } from '../driverProfileItem';
import { DriversService } from '../drivers.service';

@Component({
  selector: 'app-driver-profile',
  template: `
  <div class="mat-elevation-z8">
      <table mat-table [dataSource]="driverProfile$ | async" class="full-width-table" aria-label="Elements">
        <!-- <ng-container matColumnDef="driver_id">
          <th mat-header-cell *matHeaderCellDef >ID</th>
          <td mat-cell *matCellDef="let row">
            <a [routerLink]="['driver', row.driver_id]">{{row.driver_id}}</a>
          
          </td>
        </ng-container> -->
        <ng-container *ngFor="let col of displayedObjects" [matColumnDef]='col.name'>
          <th mat-header-cell *matHeaderCellDef>{{col.title}}</th>
          <td mat-cell *matCellDef="let row">{{row[col.name]}}</td>
        </ng-container>  
        <!-- <ng-container matColumnDef='code'>
          <th mat-header-cell *matHeaderCellDef>Code</th>
          <td mat-cell *matCellDef="let row">{{row.code}}</td>
        </ng-container>    
        <ng-container matColumnDef='position'>
          <th mat-header-cell *matHeaderCellDef>Position</th>
          <td mat-cell *matCellDef="let row">{{row.position}}</td>
        </ng-container>    
        <ng-container matColumnDef='nationality'>
          <th mat-header-cell *matHeaderCellDef>Nationality</th>
          <td mat-cell *matCellDef="let row">{{row.nationality}}</td>
        </ng-container>    
        <ng-container matColumnDef='points'>
          <th mat-header-cell *matHeaderCellDef>Points</th>
          <td mat-cell *matCellDef="let row">{{row.points}}</td>
        </ng-container>    
        <ng-container matColumnDef='wins'>
          <th mat-header-cell *matHeaderCellDef>Current Year Wins</th>
          <td mat-cell *matCellDef="let row">{{row.wins}}</td>
        </ng-container>     -->

    
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    

    </div>
  `,
  styles: [`
  .full-width-table {
    width: 100%;
  }
  
`]
})
export class DriverProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private driversService:DriversService) { }

  driverProfile$: Observable<DriverProfileItem[]>;

  displayedObjects = [
    {name:"race.race_id", title:"Race Id"},
    {name:"race.name", title:"Race Name"},
    {name:"race.date", title:"Date"},
    {name:"min_lap_time", title:"Min Lap Time"},
    {name:"max_lap_time", title:"Max Lap Time"},
    {name:"pit_stops_num", title:"Pit Stops Number"},
    {name:"pit_stops_min", title:"Fastest Pit Stops"},
    {name:"pit_stops_max", title:"Slowest Pit Stops"},
    {name:"circuit_name", title:"Circuit Name"},
    {name:"points", title:"Points"},
    {name:"position_text", title:"Position Text"},

  ];

  displayedColumns = this.displayedObjects.map(obj=>obj.name)


  ngOnInit(): void {
    const {driverId} = this.route.snapshot.params;

    this.driverProfile$ = this.driversService.getDriver(driverId);

  }

}
