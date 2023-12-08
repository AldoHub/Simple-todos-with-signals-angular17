import { Component, inject, computed } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSignal = this.todosService.filterSignal; //filter
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.todosService.todosSignal().filter((todo) => !todo.isCompleted).length;
  }); //active todos count

  emptyTodos = computed(() => { return this.todosService.todosSignal().length === 0 });

  itemsLeftText = computed(() => {
    return `item${this.activeCount() !== 1 ? 's' : ''} left`;
  })


  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todosService.setFilter(filter);
    console.log('after changeFilter', this.todosService.filterSignal());
  }

}
