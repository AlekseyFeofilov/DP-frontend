import { CreateCompanyDto, EditCompanyDto } from '@dp/admin/company/dto';

import { NewCompany } from '../models/new-company';

export function convertNewCompanyToDto(
  newCompany: NewCompany,
): CreateCompanyDto | EditCompanyDto {
  return {
    companyName: newCompany.name,
    placesQuantity: newCompany.vacanciesNumber,
    communicationPlace: newCompany.communicationPlace,
    contact: newCompany.contact,
    comment: newCompany.comment,
    isPartner: newCompany.isPartner,
    tutor: newCompany.tutor,
    vacancy: '', // TODO
  };
}
