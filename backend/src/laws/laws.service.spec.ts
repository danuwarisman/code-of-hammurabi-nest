import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LawsService } from './laws.service.js';

describe('LawsService', () => {
  let service: LawsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LawsService],
    }).compile();

    service = module.get<LawsService>(LawsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all initial laws in memory', () => {
      const laws = service.findAll();
      expect(laws).toHaveLength(4);
      expect(laws[0].pasalNum).toBe(196);
    });
  });

  describe('findOne', () => {
    it('should return a law by id', () => {
      const law = service.findOne(1);
      expect(law).toBeDefined();
      expect(law.id).toBe(1);
      expect(law.pasalNum).toBe(196);
    });

    it('should throw NotFoundException if law not found', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new law', () => {
      const newLaw = service.create({
        pasalNum: 48,
        title: 'Moratorium Bunga Banjir',
        caste: 'Awilum',
        text: 'Jika petani mengalami gagal panen akibat banjir, ia dibebaskan dari bunga tahun tersebut.',
        logic: 'Perlindungan terhadap bencana alam dalam perekonomian agraris Babilonia.',
      });

      expect(newLaw.id).toBeDefined();
      expect(newLaw.pasalNum).toBe(48);
      expect(service.findAll()).toHaveLength(5);
    });

    it('should throw ConflictException if pasalNum already exists', () => {
      expect(() =>
        service.create({
          pasalNum: 196,
          title: 'Duplikat Lex Talionis',
          caste: 'Awilum',
          text: 'Teks duplikat...',
        }),
      ).toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update an existing law', () => {
      const updated = service.update(1, {
        title: 'Hukum Lex Talionis yang Diperbarui',
      });
      expect(updated.title).toBe('Hukum Lex Talionis yang Diperbarui');
    });

    it('should throw NotFoundException if updating non-existent id', () => {
      expect(() =>
        service.update(999, {
          title: 'Tidak Ada',
        }),
      ).toThrow(NotFoundException);
    });

    it('should throw ConflictException if updating pasalNum to an existing one', () => {
      expect(() =>
        service.update(1, {
          pasalNum: 23, // pasal 23 already used by id 2
        }),
      ).toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should remove a law and return confirmation', () => {
      const res = service.remove(1);
      expect(res.deletedLaw.id).toBe(1);
      expect(service.findAll()).toHaveLength(3);
    });

    it('should throw NotFoundException if removing non-existent id', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
