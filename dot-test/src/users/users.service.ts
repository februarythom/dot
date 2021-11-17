import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios';
import { Observable, map, tap, switchMap, of, flatMap } from 'rxjs';
import { User } from './user.entity'
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {


  constructor(
    private httpService: HttpService,
    private connection: Connection
    ) { }

  findAll(): Observable<AxiosResponse<User[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/users').pipe(
      map(response => response.data)
    );
  }


  findOne(id: string): Observable<AxiosResponse<User>> {
    return this.httpService.get(`https://jsonplaceholder.typicode.com/users?id=${id}`).pipe(
      map(response => response.data)
    );
  }

  create(user: User): Observable<AxiosResponse<User>> {
    return this.httpService.post('https://jsonplaceholder.typicode.com/users', user).pipe(
      map(response => response.data)
    );
  }

  put(id: string, user: User): Observable<AxiosResponse<User>> {
    return this.httpService.put(`https://jsonplaceholder.typicode.com/users/${id}`, {...user}).pipe(
      map(response => response.data)
    );
  }

  patch(id: string, partial: any): Observable<AxiosResponse<User>> {
    return this.httpService.patch(`https://jsonplaceholder.typicode.com/users/${id}`, {...partial}).pipe(
      map(response => response.data)
    );
  }


  delete(id: string): Observable<any> {
    return this.httpService.delete(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
      map(response => response.data)
    );
  }

  dataTransfer(): Observable<any> {

    const repository = this.connection.getRepository(User);

    return this.httpService.get('https://jsonplaceholder.typicode.com/users').pipe(
      map(response => response.data),
      tap(async() => {
        await repository.clear();
      }),
      flatMap((data) => data),
      tap(async(usertData: any) => {

        let {id, name, username, email, phone, website, address, company} = usertData;

        let newAddress = {
          address_street: address.street,
          address_suite: address.suite,
          address_city: address.city,
          address_zipcode: address.zipcode,
          address_geo_lat: address.geo.lat,
          address_geo_lng: address.geo.lng
        };

        let newCompany = {
          company_name: company.name,
          company_catchPhrase: company.catchPhrase,
          company_bs: company.bs
        }

        let user = new User()

        user = {id, name, username, email, phone, website, ...newAddress, ...newCompany};

        await repository.save(user)

      }),
      switchMap(() => of({transfer: 'success'}))
    );
  }

}

