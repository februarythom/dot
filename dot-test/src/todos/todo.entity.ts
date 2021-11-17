import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  userId: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ default: true })
  @ApiProperty()
  completed: boolean;
}
