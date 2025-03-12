import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  ghzinform: number;

  @IsNotEmpty()
  sensity: number;

  @IsNotEmpty()
  macroVariantSpeed: string;

  @IsNotEmpty()
  whichWeapon: string;
}
