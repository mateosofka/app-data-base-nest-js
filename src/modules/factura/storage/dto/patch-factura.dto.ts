import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEmail, ValidateNested } from 'class-validator';
import { FacturaDetalleDto } from './factura-detalle.dto';

export class PatchFacturaDto {
  @IsOptional()
  @IsString()
  clienteNombre?: string;
  @IsOptional()
  @IsEmail()
  clienteCorreo?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => FacturaDetalleDto)
  detalleFactura?: FacturaDetalleDto[];
}
