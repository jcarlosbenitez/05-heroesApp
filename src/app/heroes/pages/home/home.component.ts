import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})

export class HomeComponent implements OnInit {
  // auth!: Auth;
  get auth() {
    console.log('aut')
    return this.authService.auth;
  }
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}


  logout(){
    //ir al backend
    //usuario
    this.router.navigate(['./auth'])
  }
}
