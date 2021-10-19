import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

export type EntityArrayResponseType = HttpResponse<Todo[]>;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  getTodo(): Observable<EntityArrayResponseType> {
    return this.httpClient.get<Todo[]>('http://localhost:3000/todo/all', {
      observe: 'response',
    });
  }
  createTodo(item: any): Observable<any> {
    return this.httpClient.post<Todo[]>('http://localhost:3000/todo/create', item);
  }
}
