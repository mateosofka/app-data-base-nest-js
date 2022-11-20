import { Test, TestingModule } from '@nestjs/testing';
import { DetalleFacturaService } from './detalle-factura.service';
import { Repository } from 'typeorm';
import { DetalleFacturaEntity } from '../../storage/databases/mysql/entities/detalle-factura.entity';
import { DetalleFacturaMapper } from '../../storage/mappers/detalle-factura.mapper';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DetalleFacturaService', () => {
  let service: DetalleFacturaService;
  let repostiroy: Repository<DetalleFacturaEntity>;

  beforeEach(async () => {
    const expected = {
      producto: 'test',
      cantidad: 1,
      precio: 1,
      total: 1,
      facturaId: 1,
      id: 1,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetalleFacturaService,
        DetalleFacturaMapper,
        {
          provide: getRepositoryToken(DetalleFacturaEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(expected),
            createQueryBuilder: jest.fn().mockReturnValue({
              update: jest.fn().mockReturnThis(),
              set: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              execute: jest.fn().mockReturnThis(),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DetalleFacturaService>(DetalleFacturaService);
    repostiroy = module.get<Repository<DetalleFacturaEntity>>(
      getRepositoryToken(DetalleFacturaEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repostiroy).toBeDefined();
  });

  describe('addDetail()', () => {
    it('should successfully insert a invoice detail', () => {
      const dto = {
        producto: 'test',
        cantidad: 1,
        precio: 1,
        total: 1,
        facturaId: 1,
      };

      expect(service.addDetail(dto)).resolves.toEqual(true);
    });
  });

  describe('updateDetaill()', () => {
    //Arrange
    const data = {
      producto: 'test',
      cantidad: 1,
      precio: 1,
      total: 1,
      facturaId: 1,
      id: 1,
    };

    it('should return a true', async () => {
      jest
        .spyOn(repostiroy.createQueryBuilder(), 'execute')
        .mockResolvedValue(true);
      //Act
      const result = await service.updateDetail(1, data);
      expect(result).toEqual(true);
    });
  });
});
