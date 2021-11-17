import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Photo } from './photo.entity'
import { ApiParam } from '@nestjs/swagger';

@Controller('photos')
export class PhotosController {

  constructor(private photosService: PhotosService) { }

  @Get()
  findAll(): Observable<AxiosResponse<Photo[]>> {
    return this.photosService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id'})
  findOne(@Param() params): Observable<AxiosResponse<Photo>> {

    let { id } = params;

    if(id === 'transfer') {
      return this.photosService.dataTransfer();
    } else {
      return this.photosService.findOne(params.id);
    }

  }

  @Post()
  create(@Body() photo): Observable<AxiosResponse<Photo>> {
    return this.photosService.create(photo);
  }

  @Put(':id')
  @ApiParam({name: 'id'})
  update(@Param() params, @Body() photo): Observable<AxiosResponse<Photo>> {
    return this.photosService.put(params.id, photo);
  }

  @Patch(':id')
  @ApiParam({name: 'id'})
  patch(@Param() params, @Body() partial): Observable<AxiosResponse<Photo>> {
    return this.photosService.patch(params.id, partial);
  }

  @Delete(':id')
  @ApiParam({name: 'id'})
  delete(@Param() params): Observable<any> {
    return this.photosService.delete(params.id);
  }


}
