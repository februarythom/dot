import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { User } from './users/user.entity';
import { Album } from './albums/album.entity';
import { Photo } from './photos/photo.entity';
import { Todo } from './todos/todo.entity';
import { Post } from './posts/post.entity';
import { Comment } from './comments/comment.entity';
import { AlbumsModule } from './albums/albums.module';
import { CommentsModule } from './comments/comments.module';
import { PhotosModule } from './photos/photos.module';
import { PostsModule } from './posts/posts.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DBHOST,
      port: Number(process.env.DBPORT),
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DATABASE,
      entities: [
        User,
        Album,
        Photo,
        Todo,
        Post,
        Comment
      ],
      synchronize: true,
    }),
    AlbumsModule,
    CommentsModule,
    PhotosModule,
    PostsModule,
    TodosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
