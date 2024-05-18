import { EmploymentVariantDto } from '@dp/shared/employment-variant/dto';
import { EmploymentVariant } from '../models';
import { EMPLOYMENT_VARIANT_STATUS_MAP } from './employment-varioant-status-map';

export function convertDtoToEmploymentVariant(
  dto: EmploymentVariantDto,
): EmploymentVariant {
  return {
    id: dto.id,
    priority: dto.priority,
    companyName: '', // TODO
    vacancy: dto.occupation,
    status: EMPLOYMENT_VARIANT_STATUS_MAP[dto.status],
    comment: dto.comment ?? null,
  };
}
