import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DetalleFacturaEntity } from '../../storage/databases/mysql/entities/detalle-factura.entity';

@Injectable()
export class DetalleFacturaService {
  constructor(private dataSource: DataSource) {}

  async updateDetail(
    detalleId: number,
    detalle: DetalleFacturaEntity,
  ): Promise<boolean> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    try {
      await queryBuilder // poner nombre tab
        .update(DetalleFacturaEntity)
        .set({
          //pasar mejor detalle como objeto
          producto: detalle.producto,
          cantidad: detalle.cantidad,
          precio: detalle.precio,
          total: detalle.total,
        })
        .where('dtl_id = :id', { id: detalleId })
        .execute();
      return true;
    } catch (error) {
      throw new HttpException(
        'Tenemos problemas editando el detalle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
