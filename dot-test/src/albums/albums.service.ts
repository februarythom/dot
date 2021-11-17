import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable, map, tap, switchMap, of } from 'rxjs';
import { Album } from './album.entity'
import { Connection } from 'typeorm';

@Injectable()
export class AlbumsService {


  constructor(
    private httpService: HttpService,
    private connection: Connection
    ) { }

  findAll(): Observable<AxiosResponse<Album[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/albums').pipe(
      map(response => response.data)
    );
  }


  findOne(id: string): Observable<AxiosResponse<Album>> {
    return this.httpService.get(`https://jsonplaceholder.typicode.com/albums?id=${id}`).pipe(
      map(response => response.data)
    );
  }

  create(album: Album): Observable<AxiosResponse<Album>> {
    return this.httpService.post('https://jsonplaceholder.typicode.com/albums', album).pipe(
      map(response => response.data)
    );
  }

  put(id: string, album: Album): Observable<AxiosResponse<Album>> {
    return this.httpService.put(`https://jsonplaceholder.typicode.com/albums/${id}`, {...album}).pipe(
      map(response => response.data)
    );
  }

  patch(id: string, partial: any): Observable<AxiosResponse<Album>> {
    return this.httpService.patch(`https://jsonplaceholder.typicode.com/albums/${id}`, {...partial}).pipe(
      map(response => response.data)
    );
  }


  delete(id: string): Observable<any> {
    return this.httpService.delete(`https://jsonplaceholder.typicode.com/albums/${id}`).pipe(
      map(response => response.data)
    );
  }

  dataTransfer(): Observable<any> {

    const repository = this.connection.getRepository(Album);

    return this.httpService.get('https://jsonplaceholder.typicode.com/albums').pipe(
      map(response => response.data),
      tap(async() => {
        await repository.clear();
      }),
      tap((albums: Album[]) => {

        albums.forEach((albumItem) => {

          let album = new Album()

          album = {...albumItem};

          repository.save(album)

        })
      }),
      switchMap(() => of({transfer: 'success'}))
    );
  }

}

