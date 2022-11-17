import { Module } from '@nestjs/common';
import { FacturaModule } from './modules/factura/factura.module';

@Module({
  imports: [FacturaModule],
})
export class AppModule {}
