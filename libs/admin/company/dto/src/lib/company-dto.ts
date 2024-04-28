import { CreateCompanyDto } from './create-company-dto';

export interface CompanyDto extends CreateCompanyDto {
  id: string;
}
