import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcM-n37xRo4WwTRU9LfurHKzCmdgI7dC4";

  signup(email : string, password : string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcM-n37xRo4WwTRU9LfurHKzCmdgI7dC4", {
      email : email,
      password : password,
      returnSecureToken : true
    });
  }

  login(email : string, password : string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcM-n37xRo4WwTRU9LfurHKzCmdgI7dC4",{
      email : email,
      password : password,
      returnSecureToken : true
    });
  }
}
