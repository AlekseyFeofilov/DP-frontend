import { CompanyDto } from '@dp/shared/company/dto';
import { Company } from '../models/company';

export function convertDtoToCompany(companyDto: CompanyDto): Company {
  return {
    id: companyDto.id,
    name: companyDto.companyName,
    tutor: companyDto.tutor,
    contact: companyDto.contact ?? null,
    vacancies: [], // TODO
    vacanciesNumber: companyDto.placesQuantity ?? null,
    isPartner: companyDto.isPartner,
    comment: companyDto.comment ?? null,
    communicationPlace: companyDto.placesQuantity ?? null,
  };
}
