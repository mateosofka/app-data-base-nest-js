import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  HttpException,
  HttpStatus,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { FacturaService } from '../services/factura.service';
import { FacturaDto } from '../dto/factura.dto';
import { FacturaEntity } from '../entities/factura.entity';
import { PatchFacturaDto } from '../dto/patch-factura.dto';
import { FacturaDetalleDto } from 'src/dto/factura-detalle.dto';
import { DetalleFacturaEntity } from '../entities/detalle-factura.entity';

@Controller('api/factura')
export class FacturaController {
  constructor(private readonly appService: FacturaService) {}

  @Get()
  getAllFacturas(): Promise<FacturaEntity[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  async getFactura(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FacturaEntity> {
    const factura = await this.appService.findOne(id);
    if (factura) {
      return factura;
    }
    throw new HttpException('id not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  createFactura(@Body() factura: FacturaDto): Promise<FacturaEntity> {
    const newFactura = new FacturaEntity(factura);
    return this.appService.create(newFactura);
  }

  @Post('/repository')
  createFacturaRepository(@Body() factura: FacturaDto): Promise<FacturaEntity> {
    const newFactura = new FacturaEntity(factura);
    return this.appService.createRpository(newFactura);
  }

  @Put('/detalle/:detalleId')
  async updateDetalleFactura(
    @Param('detalleId', ParseIntPipe) detalleId: number,
    @Body() facturaDetalle: FacturaDetalleDto,
  ): Promise<boolean> {
    return await this.appService.updateDetail(
      detalleId,
      new DetalleFacturaEntity(facturaDetalle),
    );
  }

  @Put(':id')
  async updateFactura(
    @Param('id', ParseIntPipe) id: number,
    @Body() factura: FacturaDto,
  ): Promise<boolean> {
    return await this.appService.update(id, new FacturaEntity(factura));
  }

  @Delete(':id')
  removeFactura(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.appService.remove(id);
  }

  @Patch(':id')
  async updateSingleFieldFactura(
    @Param('id', ParseIntPipe) id: number,
    @Body() factura: PatchFacturaDto,
  ): Promise<boolean> {
    return await this.appService.patch(id, factura);
  }
}
