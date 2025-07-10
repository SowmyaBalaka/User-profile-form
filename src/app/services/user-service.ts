import { Injectable } from '@angular/core';
import { IPersonModel } from '../interfaces/person-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:IPersonModel[]=[]
  constructor() { }

  // TODO : Set the user here only to have a centralized service usage 

  saveUser(personDetails:IPersonModel[]){
      localStorage.setItem('persons', JSON.stringify(personDetails));
  }
   
  getUsers():IPersonModel[]{
    const personString:any = localStorage.getItem('persons');
    return personString?JSON.parse(personString):[];
  }
  deleteUser(id:string):void{
    const users = this.getUsers();
    const updatedUsers = users.filter(user=>user.id!==id);
    localStorage.setItem('persons',JSON.stringify(updatedUsers));
  }
}
