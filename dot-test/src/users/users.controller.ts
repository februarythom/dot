import { Body, Controller, Get, Param, Post, Put, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { User } from './user.entity'
import { ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Get()
  findAll(): Observable<AxiosResponse<User[]>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id'})
  findOne(@Query() query, @Param() params): Observable<AxiosResponse<User>> {

    console.log({params, query})
    let { id } = params;

    if(id === 'transfer') {
      return this.usersService.dataTransfer();
    } else {
      return this.usersService.findOne(params.id);
    }

  }

  @Post()
  create(@Body() user): Observable<AxiosResponse<User>> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @ApiParam({name: 'id'})
  update(@Param() params, @Body() user): Observable<AxiosResponse<User>> {
    return this.usersService.put(params.id, user);
  }

  @Patch(':id')
  @ApiParam({name: 'id'})
  patch(@Param() params, @Body() partial): Observable<AxiosResponse<User>> {
    return this.usersService.patch(params.id, partial);
  }

  @Delete(':id')
  @ApiParam({name: 'id'})
  delete(@Param() params): Observable<any> {
    return this.usersService.delete(params.id);
  }


}
