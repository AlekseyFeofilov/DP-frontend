import {
  AllCompaniesApiResponse,
  CreateCompanyApiRequest,
  CompanyByIdApiResponse,
  EditCompanyApiRequest,
} from '@dp/admin/company/data-access';
import {
  convertNewCompanyToDto,
  convertDtoToCompany,
  NewCompany,
  Company,
} from '@dp/admin/company/types';

export namespace CompanyApiAdapterHelper {
  export function parseAllCompaniesApiResponse(
    apiResponse: AllCompaniesApiResponse,
  ): Company[] {
    return apiResponse.map(companyDto => convertDtoToCompany(companyDto));
  }

  export function parseCompanyByIdApiResponse(
    apiResponse: CompanyByIdApiResponse,
  ): Company {
    return convertDtoToCompany(apiResponse);
  }

  export function parseCreateCompanyApiRequest(
    newCompany: NewCompany,
  ): CreateCompanyApiRequest {
    return {
      payload: convertNewCompanyToDto(newCompany),
    };
  }

  export function parseEditCompanyApiRequest(
    id: string,
    newCompany: NewCompany,
  ): EditCompanyApiRequest {
    return {
      id,
      payload: convertNewCompanyToDto(newCompany),
    };
  }
}
