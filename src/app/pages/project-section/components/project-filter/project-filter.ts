import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FILTER_CATEGORIES, FilterCategory } from 'assets/user_data';

@Component({
  selector: 'app-project-filter',
  imports: [],
  templateUrl: './project-filter.html',
  styleUrl: './project-filter.css',
})
export class ProjectFilter {
  @Output() filterChange = new EventEmitter();
  filterCategories: readonly FilterCategory[];
  selectedCategory = signal<FilterCategory | null>('All');

  constructor(){
    this.filterCategories = FILTER_CATEGORIES
  }

  handleSelect(filter: FilterCategory) {
    this.selectedCategory.update(current =>
      current === filter ? "All" : filter
    );
    this.filterChange.emit(this.selectedCategory())

  }
}
