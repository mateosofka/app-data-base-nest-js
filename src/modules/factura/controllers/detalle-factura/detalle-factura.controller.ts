import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
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

  @Post(':facturaId')
  @UseGuards(TokenGuard)
  async addDetalleFactura(
    @Param('facturaId', ParseIntPipe) facturaId: number,
    @Body() facturaDetalleDto: FacturaDetalleDto,
  ): Promise<boolean> {
    return await this.detalleFacturaFacturaService.addDetail({
      ...facturaDetalleDto,
      facturaId,
    });
  }

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
