import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-user',
  imports: [],
  templateUrl: './sort-user.html',
  styleUrl: './sort-user.css'
})
export class SortUser {
  @Output() sort = new EventEmitter<string>();

  onSort(event:Event){
    const sortValue = (event.target as HTMLSelectElement).value;
    this.sort.emit(sortValue);
  }
}
