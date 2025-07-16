import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-user',
  imports: [],
  templateUrl: './sort-user.html',
  styleUrl: './sort-user.css'
})
export class SortUser {
  @Output() sort = new EventEmitter<string>();

  onSort(value:string){
    const sortValue = value;
    this.sort.emit(sortValue);
  }
}
