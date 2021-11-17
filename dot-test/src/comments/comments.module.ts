import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [HttpModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
