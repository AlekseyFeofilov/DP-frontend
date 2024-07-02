import { EmploymentDtoStatus } from './employment-dto';

export interface EditEmploymentDto {
  vacancy: string;
  comment?: string | null;
  employmentStatus: EmploymentDtoStatus;
}
