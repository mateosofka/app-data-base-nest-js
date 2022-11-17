import { FacturaDetalleDto } from './factura-detalle.dto';

export class PatchFacturaDto {
  clienteNombre?: string;
  clienteCorreo?: string;
  detalleFactura?: FacturaDetalleDto[];
}
