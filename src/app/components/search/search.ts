import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-search',
  imports: [CommonModule,FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Search {
  searchTerm:string=''
  @Output() search = new EventEmitter<string>();

  onSearch(){
    console.log('Emitting search term:', this.searchTerm);
    this.search.emit(this.searchTerm.toLowerCase());
  }
}
