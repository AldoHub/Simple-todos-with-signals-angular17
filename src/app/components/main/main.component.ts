import { CommonModule} from '@angular/common';
import { Component, inject, computed  } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  public todosService = inject(TodosService);

  //calc a new signal using the todosSignal in order to decide what to render
  visibleTodos = computed(() => {
    const todos = this.todosService.todosSignal(); //list of all todos
    const filter = this.todosService.filterSignal(); //current active filter

    if(filter === FilterEnum.active){
      //returns active todos
      return todos.filter((todo) => !todo.isCompleted);
    }else if(filter === FilterEnum.completed){
      //returns completed todos
      return todos.filter((todo) => todo.isCompleted);
    }

    //return al ltodos otherwise
    return todos;
  });

}
