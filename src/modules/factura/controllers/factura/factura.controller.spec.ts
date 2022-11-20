import { Test, TestingModule } from '@nestjs/testing';
import { FacturaController } from './factura.controller';
import { FacturaService } from '../../services/factura/factura.service';
import { FacturaEntity } from '../../storage/databases/mysql/entities/factura.entity';
import { CanActivate } from '@nestjs/common';
import { TokenGuard } from '../../guards/token-validation.guard';

describe('FacturaController', () => {
  let facturaController: FacturaController;
  let service: FacturaService;

  beforeEach(async () => {
    const factura: FacturaEntity = {
      id: 0,
      clienteNombre: '',
      clienteCorreo: null,
      detalleFactura: [],
    };
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FacturaController],
      providers: [
        FacturaService,
        {
          provide: FacturaService,
          useValue: {
            create: jest.fn().mockResolvedValue(factura),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(factura),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue(mockTokenGuard)
      .compile();

    facturaController = app.get<FacturaController>(FacturaController);
    service = app.get<FacturaService>(FacturaService);
  });

  it('should be defined', () => {
    expect(facturaController).toBeDefined();
    expect(service).toBeDefined();
  });
});
