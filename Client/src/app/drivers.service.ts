import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { DriverListItem } from "./driverListItem";
import { DriverProfileItem } from './driverProfileItem';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(
    private http:HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
      })
  };

  getDriversList(): Observable<DriverListItem[]>{
    return this.http.get<DriverListItem[]>(`${environment.driversApi}/api/drivers/list`,this.httpOptions)
      .pipe(
        tap((r)=>console.log(`Drivers num:${r.length}`)),
        catchError(this.handleError<DriverListItem[]>('getDriversList', []))
      )
  }

  getDriver(id: String): Observable<DriverProfileItem[]> {
    const url = `${environment.driversApi}/api/drivers/driver/${id}`;
    return this.http.get<DriverProfileItem[]>(url).pipe(
      tap(r => console.log(`fetched driver id=${id}, races:${r.length}`)),
      catchError(this.handleError<DriverProfileItem[]>(`getHero id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
