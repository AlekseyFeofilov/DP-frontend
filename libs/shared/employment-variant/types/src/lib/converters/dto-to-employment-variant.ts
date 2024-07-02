import { EmploymentVariantDto } from '@dp/shared/employment-variant/dto';

import { convertDtoToCompany } from '@dp/shared/company/types';
import { EmploymentVariant } from '../models';
import { EMPLOYMENT_VARIANT_STATUS_MAP_FROM_DTO } from './employment-variant-status-map';

export function convertDtoToEmploymentVariant(
  dto: EmploymentVariantDto,
): EmploymentVariant {
  return {
    id: dto.id,
    priority: dto.priority,
    company: convertDtoToCompany(dto.internshipRequestDTO.employer), // TODO
    vacancy: dto.occupation,
    status: EMPLOYMENT_VARIANT_STATUS_MAP_FROM_DTO[dto.status],
    comment: dto.internshipRequestDTO.comment ?? null,
  };
}
