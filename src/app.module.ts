import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DetalleFacturaEntity } from './entities/detalle-factura.entity';
import { FacturaEntity } from './entities/factura.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'poi098',
      database: 'facturacion',
      entities: [FacturaEntity, DetalleFacturaEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([FacturaEntity, DetalleFacturaEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
