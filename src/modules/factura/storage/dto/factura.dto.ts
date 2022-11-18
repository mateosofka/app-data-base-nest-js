import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, ValidateNested } from 'class-validator';
import { FacturaDetalleDto } from './factura-detalle.dto';

export class FacturaDto {
  @IsNotEmpty()
  @IsString()
  clienteNombre: string;
  @IsNotEmpty()
  @IsEmail()
  clienteCorreo?: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FacturaDetalleDto)
  detalleFactura?: FacturaDetalleDto[];
}
