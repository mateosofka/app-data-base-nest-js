import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFacturaDetalleDto {
  @IsNotEmpty()
  @IsString()
  producto: string;
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;
  @IsNotEmpty()
  @IsNumber()
  precio: number;
  @IsNotEmpty()
  @IsNumber()
  total: number;
  @IsNotEmpty()
  @IsNumber()
  facturaId: number;
}