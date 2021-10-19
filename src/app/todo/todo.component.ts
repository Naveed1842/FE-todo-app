import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoList: any[] = [];
  inputValue: string = '';
  message: string;
  constructor(protected todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }
  getTodos(){
    this.todoService.getTodo().subscribe(
      (response: HttpResponse<Todo[]>) => {
        this.todoList = response.body || [];
      },
      (err) => {
        console.log('Something bad happened', err);
      }
    );
  }
  handleClick() {
    if (this.inputValue.trim() !== '') {
      this.add(this.inputValue);
      this.inputValue = '';
    }
  }

  public add(name: string): void {
    let newTodo = {
      name: name,
      description: '',
      status: 'pending',
    };
    this.todoService.createTodo(newTodo).subscribe(
      (res) => {
        if(res && res.id){
          this.getTodos();
        }
      },
      (err) => {
        console.log('Something bad happened', err);
      }
    );
  }
}
