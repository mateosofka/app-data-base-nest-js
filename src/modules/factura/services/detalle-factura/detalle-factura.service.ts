import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleFacturaEntity } from '../../storage/databases/mysql/entities/detalle-factura.entity';
import { CreateFacturaDetalleDto } from '../../storage/dto/create-factura-detalle.dto';
import { FacturaDetalleDto } from '../../storage/dto/factura-detalle.dto';
import { DetalleFacturaMapper } from '../../storage/mappers/detalle-factura.mapper';

@Injectable()
export class DetalleFacturaService {
  constructor(
    @InjectRepository(DetalleFacturaEntity)
    private readonly repository: Repository<DetalleFacturaEntity>,
    private mapper: DetalleFacturaMapper,
  ) {}

  async addDetail(detalleDto: CreateFacturaDetalleDto): Promise<boolean> {
    try {
      const detalle = this.mapper.map(detalleDto);
      const result = this.repository.save(detalle);
      console.log('result', result);
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
    detalle: FacturaDetalleDto,
  ): Promise<boolean> {
    const queryBuilder = this.repository.createQueryBuilder();
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
