import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable, map, tap, switchMap, of } from 'rxjs';
import { Todo } from './todo.entity'
import { Connection } from 'typeorm';

@Injectable()
export class TodosService {


  constructor(
    private httpService: HttpService,
    private connection: Connection
    ) { }

  findAll(): Observable<AxiosResponse<Todo[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos').pipe(
      map(response => response.data)
    );
  }


  findOne(id: string): Observable<AxiosResponse<Todo>> {
    return this.httpService.get(`https://jsonplaceholder.typicode.com/todos?id=${id}`).pipe(
      map(response => response.data)
    );
  }

  create(todo: Todo): Observable<AxiosResponse<Todo>> {
    return this.httpService.post('https://jsonplaceholder.typicode.com/todos', todo).pipe(
      map(response => response.data)
    );
  }

  put(id: string, todo: Todo): Observable<AxiosResponse<Todo>> {
    return this.httpService.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {...todo}).pipe(
      map(response => response.data)
    );
  }

  patch(id: string, partial: any): Observable<AxiosResponse<Todo>> {
    return this.httpService.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {...partial}).pipe(
      map(response => response.data)
    );
  }


  delete(id: string): Observable<any> {
    return this.httpService.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).pipe(
      map(response => response.data)
    );
  }

  dataTransfer(): Observable<any> {

    const repository = this.connection.getRepository(Todo);

    return this.httpService.get('https://jsonplaceholder.typicode.com/todos').pipe(
      map(response => response.data),
      tap(async() => {
        await repository.clear();
      }),
      tap((todos: Todo[]) => {


        todos.forEach(async (todoItem) => {

          let todo = new Todo()

          todo = {...todoItem};

          await repository.save(todo)

        })
      }),
      switchMap(() => of({transfer: 'success'}))
    );
  }

}

