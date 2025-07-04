import { Component } from '@angular/core';
import { UserService } from '../user-service';
import { PersonModel } from '../person-model';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'

@Component({
  selector: 'app-view-all-users',
  imports: [NgFor,NgIf,NgxPaginationModule],
  templateUrl: './view-all-users.html',
  styleUrl: './view-all-users.css'
})
export class ViewAllUsers {
  users:PersonModel[]=[];
  selectedUser!: PersonModel;
  isDeleted=false;
  deletedUser:string='';
  page:number=1;
  constructor(private userservice:UserService,private router:Router){
    // this.users = this.userservice.getUsers();
    // console.log(this.users);
  }
  ngOnInit(){
    this.users = this.userservice.getUsers()
  }
  editUser(id:string){
    this.router.navigate(['/registerUser',id])
    //console.log(id)
  }
  deleteUser(id:string){
    this.userservice.deleteUser(id);
    this.users=this.userservice.getUsers();
    this.isDeleted=true;
  }
  
}
