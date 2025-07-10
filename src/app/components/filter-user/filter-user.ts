import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-user',
  imports: [],
  templateUrl: './filter-user.html',
  styleUrl: './filter-user.css'
})
export class FilterUser {
  @Output() filter = new EventEmitter<string>();

  onFilter(event:Event){
    const profession = (event.target as HTMLSelectElement).value
    this.filter.emit(profession);
  }
}
