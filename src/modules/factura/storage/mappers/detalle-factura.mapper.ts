import { DetalleFactura } from './../../models/detalle-factura';
import { DetalleFacturaEntity } from '../databases/mysql/entities/detalle-factura.entity';
import { FacturaDetalleDto } from '../dto/factura-detalle.dto';
import { CreateFacturaDetalleDto } from '../dto/create-factura-detalle.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DetalleFacturaMapper {
  public mapDto(dto: FacturaDetalleDto): DetalleFacturaEntity {
    const detalle: DetalleFactura = {
      producto: dto.producto,
      cantidad: dto.cantidad,
      precio: dto.precio,
      total: dto.total,
    };
    return new DetalleFacturaEntity(detalle);
  }

  public map(dto: CreateFacturaDetalleDto): DetalleFacturaEntity {
    const detalle: DetalleFactura = {
      facturaId: dto.facturaId,
      producto: dto.producto,
      cantidad: dto.cantidad,
      precio: dto.precio,
      total: dto.total,
    };
    return new DetalleFacturaEntity(detalle);
  }
}
