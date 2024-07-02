import { EmploymentDto } from '@dp/admin/employment/dto';

import { Employment } from '../models';
import { EMPLOYMENT_STATUS_MAP_FROM_DTO } from './employment-status-map';

export function convertDtoToEmployment(dto: EmploymentDto): Employment {
  return {
    id: dto.id,
    vacancy: dto.vacancy,
    comment: dto.comment,
    companyName: dto.employer.companyName,
    status: EMPLOYMENT_STATUS_MAP_FROM_DTO[dto.employmentStatus],
  };
}
