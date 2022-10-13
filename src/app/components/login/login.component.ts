import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import User from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidCredintials: String = 'hidden';
  user = {} as User;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router, private cookie: CookieService) { }

  ngOnInit(): void {
  }
  
  onSubmit(e: any): void {
    e.preventDefault()
    this.authService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
      .subscribe(
        (response) => {      
          if(response.firstName == "" || response.password == ""){
            this.invalidCredintials = "visible";
          }else{
            this.cookie.set('userId', response.id)
            this.router.navigate(['post-feed'])
          }
        }
      )
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
