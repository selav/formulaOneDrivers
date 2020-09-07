import { Component, OnInit,AfterViewInit, Input } from '@angular/core';
import { GoogleAuthService } from '../services/google-auth.service';
import { DriversService } from '../services/drivers.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-like-button',
  template: `

      <button mat-icon-button color="warn" [class.not-connented]="likeState === undefined" (click)="like(driverId, !likeState)" aria-label="Like this driver">
        <mat-icon *ngIf="!likeState">favorite_border</mat-icon>
        <mat-icon *ngIf="likeState">favorite</mat-icon>
      </button>


    <!-- <button *ngIf="!checkLikeState()" mat-button (click)="like(driverId, true)">Like</button>
    <button *ngIf="checkLikeState()" mat-button (click)="like(driverId, false)">unLike</button> -->
  `,
  styles: [`
    .not-connented.mat-icon-button {
      color: #d2c6c6;
    }
  `]
})
export class LikeButtonComponent implements OnInit,AfterViewInit {

  constructor(
    private authService:GoogleAuthService,
    private driversService:DriversService
  ) { }

  private destroy$ = new Subject();

  @Input() driverId:Number;
  @Input() likeState:Boolean;



  async ngOnInit() {
 
  }

  ngAfterViewInit(){
    if(this.checkLikeState() === undefined &&  this.authService.token){
      this.driversService.isLiked(this.driverId, this.authService.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('init state:',result)
        this.likeState = result;
      });
    }
  }

  async like(driverId:Number,likeState:Boolean=true) {
    try{
        await this.authService.hostComponentInit(); //init authorization
        this.driversService.likeDriver(this.authService.token,driverId,likeState)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          console.log('button pressed state:',result)
          this.likeState = result;
        });;
    }
    catch(err){
      console.error(`Authentication Error`,err)
      debugger;
    }   
    
  }

  checkLikeState(){
    if(this.likeState === false){
      return false
    }
    if(this.likeState === true){
      return true
    }
    else return undefined
  }

  ngOnDestroy(): void {
    this.destroy$.next();  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }

}
