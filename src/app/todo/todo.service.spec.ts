import { TestBed } from '@angular/core/testing';
import { Todo } from './todo.model';

import { TodoService } from './todo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TodoService', () => {
  let service: TodoService;
  let expectedResult: Todo[] | null;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return a list of todos', () => {
    const todos = [
      {
        id: '112233',
        name: 'Learn',
        description: 'Learn at leat one thing a day',
        status: 'completed',
      },
      {
        id: '445566',
        name: 'Pratice',
        description: 'Practice what you have learned',
        status: 'completed',
      },
    ];
    service.getTodo().subscribe((response) => (expectedResult = response.body));
    httpTestingController
      .expectOne({ url: 'http://localhost:3000/todo/all', method: 'GET' })
      .flush(todos);
    httpTestingController.verify();
    expect(expectedResult).toEqual(todos);
  });
});
