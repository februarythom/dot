import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  userId: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ length: 1000 })
  @ApiProperty()
  body: string;

}
