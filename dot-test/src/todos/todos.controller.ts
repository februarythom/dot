import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Todo } from './todo.entity'
import { ApiParam } from '@nestjs/swagger';

@Controller('todos')
export class TodosController {

  constructor(private todosService: TodosService) { }

  @Get()
  findAll(): Observable<AxiosResponse<Todo[]>> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id'})
  findOne(@Param() params): Observable<AxiosResponse<Todo>> {

    let { id } = params;

    if(id === 'transfer') {
      return this.todosService.dataTransfer();
    } else {
      return this.todosService.findOne(params.id);
    }

  }

  @Post()
  create(@Body() todo): Observable<AxiosResponse<Todo>> {
    return this.todosService.create(todo);
  }

  @Put(':id')
  @ApiParam({name: 'id'})
  update(@Param() params, @Body() todo): Observable<AxiosResponse<Todo>> {
    return this.todosService.put(params.id, todo);
  }

  @Patch(':id')
  @ApiParam({name: 'id'})
  patch(@Param() params, @Body() partial): Observable<AxiosResponse<Todo>> {
    return this.todosService.patch(params.id, partial);
  }

  @Delete(':id')
  @ApiParam({name: 'id'})
  delete(@Param() params): Observable<any> {
    return this.todosService.delete(params.id);
  }


}
