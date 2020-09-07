import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { DriverListItem } from "../drivers-list/driverListItem";
import { DriverProfileItem } from '../driver-profile/driverProfileItem';

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

  getDriver(id: Number,token: String=null): Observable<DriverProfileItem[]> {
    const url = `${environment.driversApi}/api/drivers/driver/${id}/${token}`;
    return this.http.get<DriverProfileItem[]>(url).pipe(
      tap(r => console.log(`fetched driver id=${id}, races:${r.length}`)),
      catchError(this.handleError<DriverProfileItem[]>(`driver id=${id}`))
    );
  }

  likeDriver(token: String, driverId:Number,likeState: Boolean = true): Observable<Boolean> {
    const url = `${environment.driversApi}/api/drivers/driver/like`;
    const reqObj ={
      token,
      driverId,
      likeState
    }
    return this.http.post<Boolean>(url,reqObj).pipe(
      tap(r => console.log(`like driver id=${driverId}, succeed:${r}`)),
      catchError(this.handleError<Boolean>(`driver id=${driverId},likeState ${likeState}`))
    );
  }
  
  isLiked(driverId: Number,token: String=null): Observable<Boolean> {
    const url = `${environment.driversApi}/api/drivers/driver/isLiked/${driverId}/${token}`;
    return this.http.get<Boolean>(url).pipe(
      tap(r => console.log(`checkk driver id=${driverId} like, result:${r}`)),
      catchError(this.handleError<Boolean>(`driver id=${driverId}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error}`); // log to console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
