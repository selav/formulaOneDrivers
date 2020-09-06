import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DriverListItem } from '../driverListItem';
import { Observable } from 'rxjs';
import { DriversService } from '../drivers.service';

@Component({
  selector: 'app-drivers-list',
  template: `
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="driverListItems$ | async" class="full-width-table" aria-label="Elements">
        <ng-container matColumnDef="driver_id">
          <th mat-header-cell *matHeaderCellDef >ID</th>
          <td mat-cell *matCellDef="let row">
            <a [routerLink]="['driver', row.driver_id]">{{row.driver_id}}</a>
          
          </td>
        </ng-container>
        <ng-container matColumnDef="full_name">
          <th mat-header-cell *matHeaderCellDef>Full Name</th>
          <td mat-cell *matCellDef="let row">{{row.full_name}}</td>
        </ng-container>  
        <ng-container matColumnDef='code'>
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
        </ng-container>    

    
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
export class DriversListComponent implements OnInit {
  
  constructor(private driversService:DriversService){}
  
  driverListItems$: Observable<DriverListItem[]>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'driver_id',
    'full_name',
    //'driver_ref',
    'code',
    'nationality',
    'position',
    'points',
    'wins'
  ];

  ngOnInit() {

    this.driverListItems$ = this.driversService.getDriversList();
  }

}
