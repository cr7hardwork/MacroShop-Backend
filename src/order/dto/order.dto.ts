import { IsNotEmpty, IsPositive, Max } from 'class-validator';

export class CreateOrderDto {
  @IsPositive()
  @Max(500)
  @IsNotEmpty()
  ghzinform: number;

  @IsPositive()
  @IsNotEmpty()
  sensity: number;

  @IsNotEmpty()
  macroVariantSpeed: string;

  @IsNotEmpty()
  whichWeapon: string;

  url: string;
}
