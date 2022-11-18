import { Module } from '@nestjs/common';
import { FacturaModule } from './modules/factura/factura.module';
import { CommonModule } from './modules/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FacturaModule,
    CommonModule,
  ],
})
export class AppModule {}
