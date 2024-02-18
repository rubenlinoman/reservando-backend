import { Test, TestingModule } from '@nestjs/testing';
import { HabitacionController } from './habitacion.controller';

describe('HabitacionController', () => {
  let controller: HabitacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitacionController],
    }).compile();

    controller = module.get<HabitacionController>(HabitacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
