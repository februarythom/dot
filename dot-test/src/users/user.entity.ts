import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  address_street: string;

  @Column()
  @ApiProperty()
  address_suite: string;

  @Column()
  @ApiProperty()
  address_city: string;

  @Column()
  @ApiProperty()
  address_zipcode: string;

  @Column()
  @ApiProperty()
  address_geo_lat: string;

  @Column()
  @ApiProperty()
  address_geo_lng: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty()
  website: string;

  @Column()
  @ApiProperty()
  company_name: string;

  @Column()
  @ApiProperty()
  company_catchPhrase: string;

  @Column()
  @ApiProperty()
  company_bs: string;

}
