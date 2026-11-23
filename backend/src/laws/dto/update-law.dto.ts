import { PartialType } from '@nestjs/mapped-types';
import { CreateLawDto } from './create-law.dto.js';

export class UpdateLawDto extends PartialType(CreateLawDto) {}
