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
} from '@nestjs/common';
import { AppService } from './app.service';
import { FacturaDto } from './dto/factura.dto';
import { FacturaEntity } from './entities/factura.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
