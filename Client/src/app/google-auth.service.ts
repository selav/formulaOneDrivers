import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private _snackBar: MatSnackBar) { }

  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;
  public token: String;

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve 
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '693782710363-blmmg53i657mehoveraaomfmb7c97n2u.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async (resolve,reject) => {
      await this.authInstance.signIn().then(
        user => {
          this.user = user;
          this.token = this.user.getAuthResponse().id_token;
          this._snackBar.open('Authenticated!!!', 'Close', {
            duration: 3000,
          });
          resolve(user) 
        },
        error => {
          this.error = error;
          this._snackBar.open('Authentication Error', 'Close', {
            duration: 3000,
          });
          reject(error) 
        })
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

  async hostComponentInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = await this.authInstance.currentUser.get();
      this.token = this.user.getAuthResponse().id_token;
    }
    else{
      await this.authenticate();
      this.user = await this.authInstance.currentUser.get();
      this.token = this.user.getAuthResponse().id_token;
    }
    return this.user;
  }

  async signOut(){
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    await this.authInstance.disconnect()
    this._snackBar.open('Disconnected', 'Close', {
      duration: 3000,
    });
  }

}
