import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { TodoInterfaceTs } from '../../types/todo.interface.ts';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service.js';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{

  todosService = inject(TodosService);

  @Input({required: true}) todo!: TodoInterfaceTs;
  @ViewChild('inputElem') inputElem!: ElementRef;
  
  editText:string = '';
  isEditMode: boolean = false;

  ngOnInit(): void {
      this.editText = this.todo.text;
     
  }

  changeText(event: Event){
    //set the text to change the todo 
    const val = (event.target as HTMLInputElement).value;
    this.editText = val;
   
  }

  setTodoEditMode(){
    this.isEditMode = true;
    setTimeout(() => {
      //set the focus state on the current clicked element
      this.inputElem.nativeElement.focus();
    }, 100)
    
  }

  closeEditMode(){
    this.isEditMode = false;
  }

  updateTodo(id:string) {
    //update the todo needed
    console.log(id)
    this.isEditMode = false;
    this.todosService.updateTodo(id, this.editText); 
  }


  removeTodo(id: string){
    this.todosService.deleteTodo(id);
  }

  toggleTodo(id: string){
    this.todosService.toggleTodo(id);
  }


}
