import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLawDto } from './dto/create-law.dto.js';
import { UpdateLawDto } from './dto/update-law.dto.js';
import { Law } from './entities/law.entity.js';

@Injectable()
export class LawsService {
  private laws: Law[] = [
    {
      id: 1,
      pasalNum: 196,
      caste: 'Awilum',
      title: 'Hukum Mata Ganti Mata (Lex Talionis)',
      text: 'If a man destroy the eye of a man (gentleman), they shall destroy his eye.',
      logic:
        'Membatasi aksi balas dendam keluarga tanpa batas (blood feud) menjadi hukuman proporsional resmi antar-bangsawan.',
      isActive: true,
      createdAt: '1750-01-01T00:00:00.000Z',
    },
    {
      id: 2,
      pasalNum: 23,
      caste: 'Mushkenum',
      title: 'Ganti Rugi oleh Kas Pemerintah Kota',
      text: 'If the brigand be not captured, the city and governor shall compensate him for whatever was lost.',
      logic:
        'Konsep awal asuransi sosial negara: keamanan wilayah adalah tanggung jawab langsung pemerintah kota.',
      isActive: true,
      createdAt: '1750-01-02T00:00:00.000Z',
    },
    {
      id: 3,
      pasalNum: 117,
      caste: 'Wardum',
      title: 'Batas Perbudakan Utang (3 Tahun)',
      text: 'For three years they shall work in the house of their master; in the fourth year they shall be given their freedom.',
      logic:
        'Mencegah perbudakan permanen seumur hidup bagi warga Babilonia yang gagal melunasi utang komersial.',
      isActive: true,
      createdAt: '1750-01-03T00:00:00.000Z',
    },
    {
      id: 4,
      pasalNum: 229,
      caste: 'Awilum',
      title: 'Tanggung Jawab Mutlak Arsitek & Tukang',
      text: 'If a builder build a house and the house collapse and cause the death of the owner, that builder shall be put to death.',
      logic:
        'Perlindungan keselamatan konsumen konstruksi paling ketat di dunia kuno terhadap kelalaian fatal tukang bangunan.',
      isActive: true,
      createdAt: '1750-01-04T00:00:00.000Z',
    },
  ];

  private idCounter = 5;

  create(createLawDto: CreateLawDto): Law {
    const existingPasal = this.laws.find(
      (l) => l.pasalNum === createLawDto.pasalNum,
    );
    if (existingPasal) {
      throw new ConflictException(
        `Pasal nomor ${createLawDto.pasalNum} sudah terpahat sebelumnya pada prasasti monolit Hammurabi!`,
      );
    }

    const newLaw: Law = {
      id: this.idCounter++,
      pasalNum: createLawDto.pasalNum,
      title: createLawDto.title,
      caste: createLawDto.caste,
      text: createLawDto.text,
      logic:
        createLawDto.logic ||
        'Ketentuan hukum resmi dari prasasti monolit Babilonia.',
      isActive: createLawDto.isActive ?? true,
      createdAt: new Date().toISOString(),
    };

    this.laws.unshift(newLaw);
    return newLaw;
  }

  findAll(): Law[] {
    return this.laws;
  }

  findOne(id: number): Law {
    const law = this.laws.find((l) => l.id === id);
    if (!law) {
      throw new NotFoundException(
        `Titah hukum dengan ID ${id} tidak ditemukan pada prasasti monolit Hammurabi!`,
      );
    }
    return law;
  }

  update(id: number, updateLawDto: UpdateLawDto): Law {
    const lawIndex = this.laws.findIndex((l) => l.id === id);
    if (lawIndex === -1) {
      throw new NotFoundException(
        `Titah hukum dengan ID ${id} tidak ditemukan pada prasasti monolit Hammurabi!`,
      );
    }

    if (updateLawDto.pasalNum !== undefined) {
      const duplicatePasal = this.laws.find(
        (l) => l.pasalNum === updateLawDto.pasalNum && l.id !== id,
      );
      if (duplicatePasal) {
        throw new ConflictException(
          `Pasal nomor ${updateLawDto.pasalNum} sudah digunakan oleh titah hukum lain pada prasasti!`,
        );
      }
    }

    const currentLaw = this.laws[lawIndex];
    const updatedLaw: Law = Object.assign(new Law(), currentLaw, updateLawDto);

    this.laws[lawIndex] = updatedLaw;
    return updatedLaw;
  }

  remove(id: number): { message: string; deletedLaw: Law } {
    const lawIndex = this.laws.findIndex((l) => l.id === id);
    if (lawIndex === -1) {
      throw new NotFoundException(
        `Titah hukum dengan ID ${id} tidak ditemukan pada prasasti monolit Hammurabi!`,
      );
    }

    const [deletedLaw] = this.laws.splice(lawIndex, 1);
    return {
      message: `Titah hukum pasal ${deletedLaw.pasalNum} berhasil dihapus dari prasasti monolit.`,
      deletedLaw,
    };
  }
}
