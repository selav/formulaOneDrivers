import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { DriversService } from "../services/drivers.service";
import { GoogleAuthService } from "../services/google-auth.service";
import { DriverProfileRacesItem, DriverProfileItem } from "./driverProfileItem";

@Component({
  selector: "app-driver-profile",
  template: `
    <div *ngIf="driverProfileRaces$ && driverProfileData$" class="data-line">
      <app-like-button [driverId]="driverId"></app-like-button>
      <app-driver-data [driverData]="driverProfileData$ | async"></app-driver-data>
    </div>
    <div class="table-wrapper mat-elevation-z8">
      <table
        mat-table
        [dataSource]="driverProfileRaces$ | async"
        class="full-width-table"
        aria-label="Elements"
      >
        <ng-container
          *ngFor="let col of displayedObjects"
          [matColumnDef]="col.name"
        >
          <th mat-header-cell *matHeaderCellDef>{{ col.title }}</th>
          <td mat-cell *matCellDef="let row">{{ row[col.name] }}</td>
        </ng-container>
        <tr
          mat-header-row
          *matHeaderRowDef="displayedColumns; sticky: true"
        ></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .full-width-table {
        width: 100%;
      }
      .table-wrapper {
        margin: 0 5%;
        height: calc(100vh - 190px);
        overflow: auto;
      }
      .driver-data{
        margin-left:40px;
      }
      .data-line {
        margin-left: 5%;
       }
    `,
  ],
})
export class DriverProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private driversService: DriversService,
    private authService: GoogleAuthService
  ) {}

  driverId: Number;

  driverProfileRaces$: Observable<DriverProfileRacesItem[]>;
  driverProfileData$: Observable<DriverProfileItem>;

  displayedObjects = [
    { name: "race.race_id", title: "Race Id" },
    { name: "race.name", title: "Race" },
    { name: "race.date", title: "Date" },
    { name: "min_lap_time", title: "Min Lap Time" },
    { name: "max_lap_time", title: "Max Lap Time" },
    { name: "pit_stops_num", title: "Pit Stops Number" },
    { name: "pit_stops_min", title: "Fastest Pit Stops" },
    { name: "pit_stops_max", title: "Slowest Pit Stops" },
    { name: "circuit_name", title: "Circuit" },
    { name: "points", title: "Points" },
    { name: "position_text", title: "Position" },
  ];

  displayedColumns = this.displayedObjects.map((obj) => obj.name);

  async ngOnInit() {
    this.driverId = this.route.snapshot.params.driverId;
    this.driverProfileRaces$ = this.driversService.getDriverRaces(
      this.driverId
    );
    this.driverProfileData$ = this.driversService.getDriverProfileData(
      this.driverId
    ).pipe(map(r=>r[0]));
  }
}
