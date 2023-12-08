import { Injectable, signal } from '@angular/core';
import { TodoInterfaceTs } from '../types/todo.interface.ts';
import { FilterEnum } from '../types/filter.enum.js';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  //filterSignal
  filterSignal = signal<FilterEnum>(FilterEnum.all);
  
  //todosSignal
  todosSignal = signal<TodoInterfaceTs[]>([]);

  setFilter(filterValue: FilterEnum): void {
    //set the value of the filter signal
    this.filterSignal.set(filterValue);
  }

  //adds a todo
  addTodo(text:string): void{
    //update the signal
    const newTodo: TodoInterfaceTs = {
      id: Math.random().toString(16),
      isCompleted: false,
      text
    }

    //add the new todo to the signal
    this.todosSignal.update((todos) => {
     return [...todos, newTodo];
    });

  }

  //updates a todo
  updateTodo(id: string, text:string):void {
    //update the todo object using the id and the text passed
    this.todosSignal.update((todos) => {
     return todos.map((todo) => { return todo.id === id ? {...todo, text} : todo })
    })
  }

  //deletes a todo
  deleteTodo(id: string):void {
    //delete the todo using the id passed
    console.log("removing the todo", id);
    this.todosSignal.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  //mark todo item as completed
  toggleTodo(id: string){
    this.todosSignal.update((todos) => {
      return todos.map((todo) => { return todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo })
     })
  }

  //TODO--- make a signal function that toggles all the todo items


}
