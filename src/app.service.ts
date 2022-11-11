import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FacturaEntity } from './entities/factura.entity';

@Injectable()
export class AppService {
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
    await this.facturaRepository.delete(id);
    return true;
  }

  async update(id: number, newfactura: FacturaEntity): Promise<boolean> {
    const factura = await this.dataSource
      .createQueryBuilder()
      .update(FacturaEntity)
      .set({
        clienteNombre: newfactura.clienteNombre,
        clienteCorreo: newfactura.clienteCorreo,
      })
      .where('id = :id', { id: id })
      .execute();
    const test = Promise.resolve(factura);
    console.log('test :>> ', test);
    return true;
  }
}
