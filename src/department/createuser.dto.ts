import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class Createuserdto {
  @IsString()
  @IsNotEmpty()
  name: string;
}