import { Test, TestingModule } from '@nestjs/testing';
import { Repository, DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FacturaService } from './factura.service';
import { FacturaEntity } from '../../storage/databases/mysql/entities/factura.entity';

describe('DetalleFacturaService', () => {
  let service: FacturaService;
  let repostiroy: Repository<FacturaEntity>;

  type MockType<T> = {
    [P in keyof T]?: jest.Mock;
  };
  const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(() => ({
    createQueryRunner: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      release: jest.fn(),
      rollbackTransaction: jest.fn(),
      manager: {
        save: jest.fn().mockResolvedValue({
          id: 1,
          clienteNombre: 'Test',
          clienteCorreo: 'test@mail.com',
          detalleFactura: [],
        }),
      },
      commitTransaction: jest.fn(),
    })),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacturaService,
        {
          provide: getRepositoryToken(FacturaEntity),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            createQueryBuilder: jest.fn().mockReturnValue({
              update: jest.fn().mockReturnThis(),
              set: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              execute: jest.fn().mockReturnThis(),
            }),
          },
        },
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory,
        },
      ],
    }).compile();

    service = module.get<FacturaService>(FacturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a new factura', async () => {
    // Arrange
    const expected = {
      id: 1,
      clienteNombre: 'Test',
      clienteCorreo: 'test@mail.com',
      detalleFactura: [],
    };
    // const dataMock = expected;
    const data = {
      id: 1,
      clienteNombre: 'Test',
      clienteCorreo: 'test@mail.com',
      detalleFactura: [],
    };
    // jest
    //   .spyOn(dataSource.createQueryRunner().manager, 'save')
    //   .mockResolvedValue(dataMock);

    // Act
    const result = await service.create(data);

    // Assert
    expect(result).toEqual(expected);
    // listo, vamos para crear una liberación alpha
  });
});
