import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TodoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(TodoService);
    spyOn(service, 'getTodo').and.returnValue(
      of(
        new HttpResponse({
          body: [
            {
              id: '112233',
              name: 'Learn',
              description: 'Learn at leat one thing a day',
              status: 'completed',
            },
            {
              id: '445566',
              name: 'Practice',
              description: 'Practice what you have learned',
              status: 'completed',
            },
          ],
        })
      )
    );
  });

  it('should show all todos', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getTodo).toHaveBeenCalled();
    expect(component.todoList).toEqual([
      {
        id: '112233',
        name: 'Learn',
        description: 'Learn at leat one thing a day',
        status: 'completed',
      },
      {
        id: '445566',
        name: 'Practice',
        description: 'Practice what you have learned',
        status: 'completed',
      },
    ]);
    let element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('.todo-item')?.length).toBe(2);

    expect(element.querySelectorAll('.id')[0].textContent).toBe('112233');
    expect(element.querySelectorAll('.id')[1].textContent).toBe('445566');

    expect(element.querySelectorAll('.name')[0].textContent).toBe('Learn');
    expect(element.querySelectorAll('.name')[1].textContent).toBe('Practice');

    expect(element.querySelectorAll('.description')[0].textContent).toBe(
      'Learn at leat one thing a day'
    );

    expect(element.querySelectorAll('.description')[1].textContent).toBe(
      'Practice what you have learned'
    );

    expect(element.querySelectorAll('.status')[0].textContent).toBe(
      'completed'
    );

    expect(element.querySelectorAll('.status')[1].textContent).toBe(
      'completed'
    );
  });
});
