import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DetalleFacturaEntity } from '../../storage/databases/mysql/entities/detalle-factura.entity';
import { CreateFacturaDetalleDto } from '../../storage/dto/create-factura-detalle.dto';
import { DetalleFacturaMapper } from '../../storage/mappers/detalle-factura.mapper';

@Injectable()
export class DetalleFacturaService {
  constructor(
    private dataSource: DataSource,
    private mapper: DetalleFacturaMapper,
  ) {}

  async addDetail(detalleDto: CreateFacturaDetalleDto): Promise<boolean> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    try {
      const detalle = this.mapper.map(detalleDto);
      await queryBuilder
        .insert()
        .into(DetalleFacturaEntity)
        .values({
          facturaId: detalle.facturaId,
          producto: detalle.producto,
          cantidad: detalle.cantidad,
          precio: detalle.precio,
          total: detalle.total,
        })
        .execute();
      return true;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'tenemos problemas en insertar un nuevo detalle',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

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
