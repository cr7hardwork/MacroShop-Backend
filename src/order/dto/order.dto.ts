import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  ghzinform: number;
 
  @IsPositive()
  @IsNotEmpty()
  sensity: number;

  @IsNotEmpty()
  macroVariantSpeed: string;

  @IsNotEmpty()
  whichWeapon: string;
}
