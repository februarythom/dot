import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Comment } from './comment.entity'
import { ApiParam } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {

  constructor(private commentsService: CommentsService) { }

  @Get()
  findAll(): Observable<AxiosResponse<Comment[]>> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id'})
  findOne(@Param() params): Observable<AxiosResponse<Comment>> {

    let { id } = params;

    if(id === 'transfer') {
      return this.commentsService.dataTransfer();
    } else {
      return this.commentsService.findOne(params.id);
    }

  }

  @Post()
  create(@Body() comment): Observable<AxiosResponse<Comment>> {
    return this.commentsService.create(comment);
  }

  @Put(':id')
  @ApiParam({name: 'id'})
  update(@Param() params, @Body() comment): Observable<AxiosResponse<Comment>> {
    return this.commentsService.put(params.id, comment);
  }

  @Patch(':id')
  @ApiParam({name: 'id'})
  patch(@Param() params, @Body() partial): Observable<AxiosResponse<Comment>> {
    return this.commentsService.patch(params.id, partial);
  }

  @Delete(':id')
  @ApiParam({name: 'id'})
  delete(@Param() params): Observable<any> {
    return this.commentsService.delete(params.id);
  }


}
