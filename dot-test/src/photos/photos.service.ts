import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable, map, tap, switchMap, of } from 'rxjs';
import { Photo } from './photo.entity'
import { Connection } from 'typeorm';

@Injectable()
export class PhotosService {


  constructor(
    private httpService: HttpService,
    private connection: Connection
    ) { }

  findAll(): Observable<AxiosResponse<Photo[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/photos').pipe(
      map(response => response.data)
    );
  }


  findOne(id: string): Observable<AxiosResponse<Photo>> {
    return this.httpService.get(`https://jsonplaceholder.typicode.com/photos?id=${id}`).pipe(
      map(response => response.data)
    );
  }

  create(photo: Photo): Observable<AxiosResponse<Photo>> {
    return this.httpService.post('https://jsonplaceholder.typicode.com/photos', photo).pipe(
      map(response => response.data)
    );
  }

  put(id: string, photo: Photo): Observable<AxiosResponse<Photo>> {
    return this.httpService.put(`https://jsonplaceholder.typicode.com/photos/${id}`, {...photo}).pipe(
      map(response => response.data)
    );
  }

  patch(id: string, partial: any): Observable<AxiosResponse<Photo>> {
    return this.httpService.patch(`https://jsonplaceholder.typicode.com/photos/${id}`, {...partial}).pipe(
      map(response => response.data)
    );
  }


  delete(id: string): Observable<any> {
    return this.httpService.delete(`https://jsonplaceholder.typicode.com/photos/${id}`).pipe(
      map(response => response.data)
    );
  }

  dataTransfer(): Observable<any> {

    const repository = this.connection.getRepository(Photo);

    return this.httpService.get('https://jsonplaceholder.typicode.com/photos').pipe(
      map(response => response.data),
      tap(async() => {
        await repository.clear();
      }),
      tap((photos: Photo[]) => {


        photos.forEach((photoItem) => {

          let photo = new Photo()

          photo = {...photoItem};

          repository.save(photo)

        })
      }),
      switchMap(() => of({transfer: 'success'}))
    );
  }

}

