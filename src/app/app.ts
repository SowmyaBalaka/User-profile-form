import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserRegistrationForm } from './components/user-registration-form/user-registration-form';
import { ViewAllUsers } from './components/view-all-users/view-all-users';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
  protected title = 'user-profile-form';
  menuOpen:boolean=false;
  toggleMenu(){
    this.menuOpen=!this.menuOpen;
  }
}
