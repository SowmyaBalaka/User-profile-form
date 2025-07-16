import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-user',
  imports: [],
  templateUrl: './filter-user.html',
  styleUrl: './filter-user.css'
})
export class FilterUser {
  @Output() filter = new EventEmitter<string>();

  onFilter(value:string){
    const profession = value
    this.filter.emit(profession.toLowerCase());
  }
}
