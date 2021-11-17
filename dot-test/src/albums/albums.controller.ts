import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Album } from './album.entity'
import { ApiParam } from '@nestjs/swagger';

@Controller('albums')
export class AlbumsController {

  constructor(private albumsService: AlbumsService) { }

  @Get()
  findAll(): Observable<AxiosResponse<Album[]>> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id'})
  findOne(@Param() params): Observable<AxiosResponse<Album>> {

    let { id } = params;

    if(id === 'transfer') {
      return this.albumsService.dataTransfer();
    } else {
      return this.albumsService.findOne(params.id);
    }

  }

  @Post()
  create(@Body() album): Observable<AxiosResponse<Album>> {
    return this.albumsService.create(album);
  }

  @Put(':id')
  @ApiParam({name: 'id'})
  update(@Param() params, @Body() album): Observable<AxiosResponse<Album>> {
    return this.albumsService.put(params.id, album);
  }

  @Patch(':id')
  @ApiParam({name: 'id'})
  patch(@Param() params, @Body() partial): Observable<AxiosResponse<Album>> {
    return this.albumsService.patch(params.id, partial);
  }

  @Delete(':id')
  @ApiParam({name: 'id'})
  delete(@Param() params): Observable<any> {
    return this.albumsService.delete(params.id);
  }


}
