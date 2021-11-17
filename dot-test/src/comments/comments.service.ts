import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable, map, tap, switchMap, of } from 'rxjs';
import { Comment } from './comment.entity'
import { Connection } from 'typeorm';

@Injectable()
export class CommentsService {


  constructor(
    private httpService: HttpService,
    private connection: Connection
    ) { }

  findAll(): Observable<AxiosResponse<Comment[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/comments').pipe(
      map(response => response.data)
    );
  }


  findOne(id: string): Observable<AxiosResponse<Comment>> {
    return this.httpService.get(`https://jsonplaceholder.typicode.com/comments?id=${id}`).pipe(
      map(response => response.data)
    );
  }

  create(comment: Comment): Observable<AxiosResponse<Comment>> {
    return this.httpService.post('https://jsonplaceholder.typicode.com/comments', comment).pipe(
      map(response => response.data)
    );
  }

  put(id: string, comment: Comment): Observable<AxiosResponse<Comment>> {
    return this.httpService.put(`https://jsonplaceholder.typicode.com/comments/${id}`, {...comment}).pipe(
      map(response => response.data)
    );
  }

  patch(id: string, partial: any): Observable<AxiosResponse<Comment>> {
    return this.httpService.patch(`https://jsonplaceholder.typicode.com/comments/${id}`, {...partial}).pipe(
      map(response => response.data)
    );
  }


  delete(id: string): Observable<any> {
    return this.httpService.delete(`https://jsonplaceholder.typicode.com/comments/${id}`).pipe(
      map(response => response.data)
    );
  }

  dataTransfer(): Observable<any> {

    const repository = this.connection.getRepository(Comment);

    return this.httpService.get('https://jsonplaceholder.typicode.com/comments').pipe(
      map(response => response.data),
      tap(async() => {
        await repository.clear();
      }),
      tap((comments: Comment[]) => {


        comments.forEach((commentItem) => {

          let comment = new Comment()

          comment = {...commentItem};

          repository.save(comment)

        })
      }),
      switchMap(() => of({transfer: 'success'}))
    );
  }

}

