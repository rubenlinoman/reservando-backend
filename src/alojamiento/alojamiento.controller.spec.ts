import { Test, TestingModule } from '@nestjs/testing';
import { AlojamientoController } from './alojamiento.controller';

describe('AlojamientoController', () => {
  let controller: AlojamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlojamientoController],
    }).compile();

    controller = module.get<AlojamientoController>(AlojamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
