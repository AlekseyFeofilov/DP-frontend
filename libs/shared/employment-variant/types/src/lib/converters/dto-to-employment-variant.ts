import { EmploymentVariantDto } from '@dp/shared/employment-variant/dto';

import { EmploymentVariant } from '../models';
import { EMPLOYMENT_VARIANT_STATUS_MAP_FROM_DTO } from './employment-variant-status-map';

export function convertDtoToEmploymentVariant(
  dto: EmploymentVariantDto,
): EmploymentVariant {
  return {
    id: dto.id,
    priority: dto.priority,
    company: {
      id: dto.employerId,
      name: '', // TODO
    },
    vacancy: dto.occupation,
    status: EMPLOYMENT_VARIANT_STATUS_MAP_FROM_DTO[dto.status],
    comment: dto.comment ?? null,
  };
}
