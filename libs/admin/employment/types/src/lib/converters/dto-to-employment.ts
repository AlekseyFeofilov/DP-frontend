import { EmploymentDto } from '@dp/admin/employment/dto';

import { EMPLOYMENT_STATUS_MAP } from './employment-status-map';
import { Employment } from '../models';

export function convertDtoToEmployment(dto: EmploymentDto): Employment {
  return {
    id: dto.id,
    vacancy: dto.vacancy,
    comment: dto.comment,
    companyName: dto.employer.companyName,
    status: EMPLOYMENT_STATUS_MAP[dto.employmentStatus],
  };
}
