import { CompanyDto } from '@dp/admin/company/dto';

import { Company } from '../models';

export function convertDtoToCompany(companyDto: CompanyDto): Company {
  return {
    id: companyDto.id,
    name: companyDto.companyName,
    spokesman: null,
    contact: companyDto.contact,
    vacancies: [],
    vacanciesNumber: Number(companyDto.placesQuantity), // TODO
  };
}
