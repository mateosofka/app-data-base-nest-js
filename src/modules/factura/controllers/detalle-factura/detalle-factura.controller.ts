import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FacturaDetalleDto } from '../../storage/dto/factura-detalle.dto';
import { DetalleFacturaEntity } from '../../storage/databases/mysql/entities/detalle-factura.entity';
import { DetalleFacturaService } from '../../services/detalle-factura/detalle-factura.service';
import { TokenGuard } from '../../guards/token-validation.guard';

@Controller('api/factura/detalle')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class DetalleFacturaController {
  constructor(
    private readonly detalleFacturaFacturaService: DetalleFacturaService,
  ) {}

  @Put(':detalleId')
  @UseGuards(TokenGuard)
  async updateDetalleFactura(
    @Param('detalleId', ParseIntPipe) detalleId: number,
    @Body() facturaDetalle: FacturaDetalleDto,
  ): Promise<boolean> {
    return await this.detalleFacturaFacturaService.updateDetail(
      detalleId,
      new DetalleFacturaEntity(facturaDetalle),
    );
  }
}
