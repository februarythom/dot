import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Post as Posts } from './post.entity'
import { ApiParam } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) { }

  @Get()
  findAll(): Observable<AxiosResponse<Posts[]>> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id'})
  findOne(@Param() params): Observable<AxiosResponse<Posts>> {

    let { id } = params;

    if(id === 'transfer') {
      return this.postsService.dataTransfer();
    } else {
      return this.postsService.findOne(params.id);
    }

  }

  @Post()
  create(@Body() post): Observable<AxiosResponse<Posts>> {
    return this.postsService.create(post);
  }

  @Put(':id')
  @ApiParam({name: 'id'})
  update(@Param() params, @Body() post): Observable<AxiosResponse<Posts>> {
    return this.postsService.put(params.id, post);
  }

  @Patch(':id')
  @ApiParam({name: 'id'})
  patch(@Param() params, @Body() partial): Observable<AxiosResponse<Posts>> {
    return this.postsService.patch(params.id, partial);
  }

  @Delete(':id')
  @ApiParam({name: 'id'})
  delete(@Param() params): Observable<any> {
    return this.postsService.delete(params.id);
  }


}
