import { Component } from '@angular/core';
import { GoogleAuthService } from './services/google-auth.service';

@Component({
  selector: 'app-root',
  styles: [`
    .header{
      display: flex;
      color: red;
      background-color: black;
      align-items: center;
      justify-content: space-between;
      top:0;
      position: -webkit-sticky;
      position: sticky;

    }

    .header h1{
      letter-spacing: 3px;
      margin: revert;
      font-family: cursive;
      font-weight: bolder;
      font-size: 3rem;
    }

  `],
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div>
      <button (click)="signOut()" >signOut</button>
    </div>
    <div class="header">
      <span class="logo">
        <img width="200" alt="F1 Logo" src="../assets/pics/logo.png">
      </span>
      <span class="content">
        <h1>
          Formula1 Drivers
        </h1>
      
      </span>
      <span class="pic">
        <img width="200" alt="F1 CAR" src="../assets/pics/f1-car.png">
      </span>
    </div> 
   
    
    
    <router-outlet></router-outlet>
  `,

})
export class AppComponent {
  
  constructor(private authService:GoogleAuthService){

  }
  
  title = 'formulaOneDrivers';

  async ngOnInit(){
    await this.authService.initGoogleAuth()

  }

  signOut(){
    this.authService.signOut();
  }
}
