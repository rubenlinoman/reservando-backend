import { Test, TestingModule } from '@nestjs/testing';
import { AlojamientoService } from './alojamiento.service';

describe('AlojamientoService', () => {
  let service: AlojamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlojamientoService],
    }).compile();

    service = module.get<AlojamientoService>(AlojamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
