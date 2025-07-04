import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRegistrationForm } from './user-registration-form/user-registration-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,UserRegistrationForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'user-profile-form';
}
