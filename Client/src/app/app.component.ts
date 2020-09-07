import { Component } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';

@Component({
  selector: 'app-root',
  styles: [`
    .header{
      padding:10px;
      display:block;
    }
    .logo{

      float: left;
    }
    .pic{
      float:right;
    }
  `],
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="header">
      <span class="logo">
        <img width="200" alt="F1 Logo" src="../assets/pics/logo.png">
      </span>
      <span style="text-align:center" class="content">
        <h1>
          Formula 1 - drivers
        </h1>
      
      </span>
      <span class="pic">
        <img width="200" alt="F1 CAR" src="../assets/pics/f1-car.png">
      </span>
    </div> 
    <div>
      <button (click)="signOut()" >signOut</button>
    </div>
    
    
    <router-outlet></router-outlet>
  `,

})
export class AppComponent {
  
  constructor(private authService:GoogleAuthService){

  }
  
  title = 'formulaOneDrivers';

  async ngOnInit(){
    await this.authService.hostComponentInit(); //init authorization
  }

  signOut(){
    this.authService.signOut();
  }
}
