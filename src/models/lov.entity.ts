import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class Lov {
  @IsNotEmpty()
  @Length(41, 41)
  key: string;

  @IsNotEmpty()
  value: string;
  shared: boolean = false;

  @IsOptional()
  issuer?: string;

  @IsOptional()
  book?: string;
}
