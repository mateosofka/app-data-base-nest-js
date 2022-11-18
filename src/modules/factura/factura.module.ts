import { DetalleFacturaController } from './controllers/detalle-factura/detalle-factura.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaController } from './controllers/factura/factura.controller';
import { DetalleFacturaEntity } from './storage/databases/mysql/entities/detalle-factura.entity';
import { FacturaEntity } from './storage/databases/mysql/entities/factura.entity';
import { FacturaService } from './services/factura/factura.service';
import { DetalleFacturaService } from './services/detalle-factura/detalle-factura.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: 'facturacion',
        entities: [FacturaEntity, DetalleFacturaEntity],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([FacturaEntity, DetalleFacturaEntity]),
  ],
  controllers: [FacturaController, DetalleFacturaController],
  providers: [FacturaService, DetalleFacturaService],
})
export class FacturaModule {}
