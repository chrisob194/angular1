import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm) {
    //console.log(form.value['email']);
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value['email'];
    const password = form.value['password'];
    if (!this.isLoginMode) {
      this.authService.signup(email,password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        }, error => {
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      this.authService.login(email,password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        }, error => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }

}
