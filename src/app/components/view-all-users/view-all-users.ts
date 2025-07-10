import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IPersonModel } from '../../interfaces/person-model';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Search } from '../search/search';
import { FilterUser } from '../filter-user/filter-user';
import { SortUser } from '../sort-user/sort-user';

@Component({
  selector: 'app-view-all-users',
  imports: [NgFor, NgIf, NgxPaginationModule, FormsModule,Search,FilterUser,SortUser],
  standalone: true,
  templateUrl: './view-all-users.html',
  styleUrls: ['./view-all-users.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewAllUsers {
  users: IPersonModel[] = [];
  selectedUser!: IPersonModel;
  isDeleted = false;
  deletedUser: string = '';
  page: number = 1;
  isSearchUser: boolean = false;
  userName: string = '';
  profession: string = '';
  constructor(private userservice: UserService, private router: Router, private toastr: ToastrService) {
    // this.users = this.userservice.getUsers();
    // console.log(this.users);
  }
  ngOnInit() {
    this.users = this.userservice.getUsers()
    // console.log(this.users)
  }
  editUser(id: string) {
    this.router.navigate(['/registerUser', id])
    //console.log(id)
  }
  deleteUser(id: string) {
    this.userservice.deleteUser(id);
    this.users = this.userservice.getUsers();
    this.toastr.success('User Deleted', 'Successfully');
  }
  searchUser(userName: string) {
    this.users=this.userservice.getUsers().filter((user)=>
        user.fullName.toLowerCase().includes(userName)
    )
    this.page=1;
  }
  filterUser(profession:string) {
    this.users=this.userservice.getUsers().filter((user)=>
      user.profession.includes(profession)
    )
    this.page=1;
  }
  sortByAge(value:string) {
    if (value === 'asc') {
      this.users.sort((u1, u2) => parseInt(u1.age) - parseInt(u2.age))
    }
    else if (value === 'desc') {
      this.users.sort((u1, u2) => parseInt(u2.age) - parseInt(u1.age))
    }
    this.page = 1
  }
}
