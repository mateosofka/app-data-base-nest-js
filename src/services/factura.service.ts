import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FacturaEntity } from '../entities/factura.entity';
import { PatchFacturaDto } from '../dto/patch-factura.dto';
import { DetalleFacturaEntity } from '../entities/detalle-factura.entity';

@Injectable()
export class FacturaService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(FacturaEntity)
    private readonly facturaRepository: Repository<FacturaEntity>,
  ) {}

  async create(factura: FacturaEntity): Promise<FacturaEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newFactura = await queryRunner.manager.save(factura);
      await queryRunner.commitTransaction();
      return Promise.resolve(newFactura);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para insertar una factura',
        HttpStatus.CONFLICT,
      );
    }
  }

  createRpository(createfactura: FacturaEntity): Promise<FacturaEntity> {
    return this.facturaRepository.save(createfactura);
  }

  async findAll(): Promise<FacturaEntity[]> {
    return this.facturaRepository.find({
      relations: {
        detalleFactura: true,
      },
    });
  }

  async findOne(id: number): Promise<FacturaEntity | null> {
    return this.facturaRepository.findOne({
      where: { id: id },
      relations: {
        detalleFactura: true,
      },
    });
  }

  async remove(id: number): Promise<boolean> {
    const factura = await this.findOne(id);
    const queryRuner = this.dataSource.createQueryRunner();
    await queryRuner.connect();
    await queryRuner.startTransaction();
    if (factura) {
      try {
        await queryRuner.manager.remove(factura.detalleFactura);
        await queryRuner.manager.remove(factura);
        await queryRuner.commitTransaction();
        return Promise.resolve(true);
      } catch (error) {
        queryRuner.rollbackTransaction();
        console.log('error.message :>> ', error.message);
        throw new HttpException(
          'Tenemos problemas para borrar una factura',
          HttpStatus.CONFLICT,
        );
      }
    }
    return Promise.resolve(false);
  }

  async update(id: number, newfactura: FacturaEntity): Promise<boolean> {
    const factura = await this.dataSource
      .createQueryBuilder()
      .update(FacturaEntity)
      .set({
        clienteNombre: newfactura.clienteNombre,
        clienteCorreo: newfactura.clienteCorreo,
        //detalleFactura: newfactura.detalleFactura,
      })
      .where('id = :id', { id: id })
      .execute();
    const test = Promise.resolve(factura);
    console.log('test :>> ', test);
    return true;
  }

  async patch(id: number, newfactura: PatchFacturaDto): Promise<boolean> {
    const oldfactura = await this.findOne(id);
    console.log('oldfactura :>> ', oldfactura);
    if (oldfactura) {
      const updatedfactura: FacturaEntity = {
        id: oldfactura.id,
        clienteNombre:
          newfactura.clienteCorreo ?? (oldfactura.clienteCorreo || ''),
        clienteCorreo: newfactura.clienteCorreo ?? oldfactura.clienteCorreo,
        detalleFactura: oldfactura.detalleFactura,
      };
      await this.update(id, updatedfactura);

      return true;
    }
    return false;
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
