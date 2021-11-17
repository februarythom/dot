import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  imports: [HttpModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
