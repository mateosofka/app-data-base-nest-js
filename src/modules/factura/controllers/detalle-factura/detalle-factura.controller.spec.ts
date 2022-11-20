import { FacturaDetalleDto } from './../../storage/dto/factura-detalle.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DetalleFacturaController } from './detalle-factura.controller';
import { DetalleFacturaService } from '../../services/detalle-factura/detalle-factura.service';
import { CanActivate } from '@nestjs/common';
import { TokenGuard } from '../../guards/token-validation.guard';

describe('ControllersController', () => {
  let controller: DetalleFacturaController;
  let service: DetalleFacturaService;
  beforeEach(async () => {
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleFacturaController],
      providers: [
        DetalleFacturaService,
        {
          provide: DetalleFacturaService,
          useValue: {
            addDetail: jest.fn().mockResolvedValue(true),
            updateDetail: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue(mockTokenGuard)
      .compile();

    controller = module.get<DetalleFacturaController>(DetalleFacturaController);
    service = module.get<DetalleFacturaService>(DetalleFacturaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create a factura detail', () => {
    const dto: FacturaDetalleDto = {
      producto: '',
      cantidad: 0,
      precio: 0,
      total: 0,
    };
    controller.addDetalleFactura(1, dto);
    expect(controller.addDetalleFactura(1, dto)).resolves.toEqual(true);
  });
});
