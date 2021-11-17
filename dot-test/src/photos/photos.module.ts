import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';

@Module({
  imports: [HttpModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
