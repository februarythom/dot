import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  albumId: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  url: string;

  @Column()
  @ApiProperty()
  thumbnailUrl: string;
}
