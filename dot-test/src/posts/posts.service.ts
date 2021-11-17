import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable, map, tap, switchMap, of } from 'rxjs';
import { Post } from './post.entity'
import { Connection } from 'typeorm';

@Injectable()
export class PostsService {


  constructor(
    private httpService: HttpService,
    private connection: Connection
    ) { }

  findAll(): Observable<AxiosResponse<Post[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/posts').pipe(
      map(response => response.data)
    );
  }


  findOne(id: string): Observable<AxiosResponse<Post>> {
    return this.httpService.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`).pipe(
      map(response => response.data)
    );
  }

  create(post: Post): Observable<AxiosResponse<Post>> {
    return this.httpService.post('https://jsonplaceholder.typicode.com/posts', post).pipe(
      map(response => response.data)
    );
  }

  put(id: string, post: Post): Observable<AxiosResponse<Post>> {
    return this.httpService.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {...post}).pipe(
      map(response => response.data)
    );
  }

  patch(id: string, partial: any): Observable<AxiosResponse<Post>> {
    return this.httpService.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {...partial}).pipe(
      map(response => response.data)
    );
  }


  delete(id: string): Observable<any> {
    return this.httpService.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
      map(response => response.data)
    );
  }

  dataTransfer(): Observable<any> {

    const repository = this.connection.getRepository(Post);

    return this.httpService.get('https://jsonplaceholder.typicode.com/posts').pipe(
      map(response => response.data),
      tap(async() => {
        await repository.clear();
      }),
      tap((posts: Post[]) => {

        posts.forEach((postItem) => {

          let post = new Post()

          post = {...postItem};

          repository.save(post)

        })
      }),
      switchMap(() => of({transfer: 'success'}))
    );
  }

}

