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
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FacturaService } from '../../services/factura/factura.service';
import { FacturaDto } from '../../storage/dto/factura.dto';
import { FacturaEntity } from '../../storage/databases/mysql/entities/factura.entity';
import { PatchFacturaDto } from '../../storage/dto/patch-factura.dto';
import { TokenGuard } from '../../guards/token-validation.guard';
import { NotFoundErrorsInterceptor } from '../../../common/interceptors/not-found-errors.interceptor';

@Controller('api/factura')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@UseInterceptors(NotFoundErrorsInterceptor)
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
  @UseGuards(TokenGuard)
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
  @UseGuards(TokenGuard)
  async updateFactura(
    @Param('id', ParseIntPipe) id: number,
    @Body() factura: FacturaDto,
  ): Promise<boolean> {
    return await this.appService.update(id, new FacturaEntity(factura));
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  removeFactura(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.appService.remove(id);
  }

  @Patch(':id')
  @UseGuards(TokenGuard)
  async updateSingleFieldFactura(
    @Param('id', ParseIntPipe) id: number,
    @Body() factura: PatchFacturaDto,
  ): Promise<boolean> {
    return await this.appService.patch(id, factura);
  }
}
