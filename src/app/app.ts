import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserRegistrationForm } from './components/user-registration-form/user-registration-form';
import { ViewAllUsers } from './components/view-all-users/view-all-users';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
  protected title = 'user-profile-form';
  constructor(private router:Router){}
  
  get showBackButton(){
    return this.router.url.startsWith('/registerUser')
  }

  goBack(){
    this.router.navigate(['/viewUsers']);
  }
}
