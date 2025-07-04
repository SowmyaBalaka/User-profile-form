import { Injectable } from '@angular/core';
import { PersonModel } from './person-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:PersonModel[]=[]
  constructor() { }
  getUsers():PersonModel[]{
    const personString:any = localStorage.getItem('persons');
    return personString?JSON.parse(personString):[];
  }
  deleteUser(id:string):void{
    const users = this.getUsers();
    const updatedUsers = users.filter(user=>user.id!==id);
    localStorage.setItem('persons',JSON.stringify(updatedUsers));
  }
}
