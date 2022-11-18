import { Test, TestingModule } from '@nestjs/testing';
import { FacturaController } from './factura.controller';
import { FacturaService } from '../../services/factura/factura.service';

describe('FacturaController', () => {
  let facturaController: FacturaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FacturaController],
      providers: [FacturaService],
    }).compile();

    facturaController = app.get<FacturaController>(FacturaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(FacturaController.getHello()).toBe('Hello World!');
    });
  });
});
