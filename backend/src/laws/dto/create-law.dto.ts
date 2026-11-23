import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateLawDto {
  @IsInt({ message: 'Nomor pasal harus berupa bilangan bulat (integer)' })
  @Min(1, { message: 'Nomor pasal minimal bernilai 1' })
  pasalNum: number;

  @IsNotEmpty({ message: 'Judul titah hukum wajib diisi' })
  @IsString({ message: 'Judul titah hukum harus berupa teks' })
  @MinLength(3, { message: 'Judul titah hukum minimal 3 karakter' })
  title: string;

  @IsNotEmpty({ message: 'Status kasta wajib diisi' })
  @IsString({ message: 'Status kasta harus berupa teks' })
  @IsIn(['Awilum', 'Mushkenum', 'Wardum'], {
    message: 'Status kasta harus salah satu dari: Awilum, Mushkenum, atau Wardum',
  })
  caste: 'Awilum' | 'Mushkenum' | 'Wardum';

  @IsNotEmpty({ message: 'Isi ketentuan hukum wajib diisi' })
  @IsString({ message: 'Isi ketentuan hukum harus berupa teks' })
  @MinLength(5, { message: 'Isi ketentuan hukum minimal 5 karakter' })
  text: string;

  @IsOptional()
  @IsString({ message: 'Logika sosial harus berupa teks' })
  logic?: string;

  @IsOptional()
  @IsBoolean({ message: 'Status isActive harus bertipe boolean (true/false)' })
  isActive?: boolean;
}
