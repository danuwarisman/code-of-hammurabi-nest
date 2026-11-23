import { Test, TestingModule } from '@nestjs/testing';
import { LawsController } from './laws.controller.js';
import { LawsService } from './laws.service.js';

describe('LawsController', () => {
  let controller: LawsController;
  let service: LawsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LawsController],
      providers: [LawsService],
    }).compile();

    controller = module.get<LawsController>(LawsController);
    service = module.get<LawsService>(LawsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return all laws on findAll', () => {
    const laws = controller.findAll();
    expect(laws).toHaveLength(4);
  });

  it('should return single law on findOne', () => {
    const law = controller.findOne(1);
    expect(law.id).toBe(1);
  });

  it('should create new law on create', () => {
    const created = controller.create({
      pasalNum: 99,
      title: 'Perkara Saksi Palsu',
      caste: 'Awilum',
      text: 'Barangsiapa bersaksi palsu dalam perkara modal, ia dihukum mati.',
    });
    expect(created.pasalNum).toBe(99);
  });

  it('should update law on update', () => {
    const updated = controller.update(1, { title: 'Judul Baru' });
    expect(updated.title).toBe('Judul Baru');
  });

  it('should remove law on remove', () => {
    const result = controller.remove(1);
    expect(result.deletedLaw.id).toBe(1);
  });
});
