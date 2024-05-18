import {
  CreateCompanyApiRequest,
  EditCompanyApiRequest,
} from '@dp/admin/company/data-access';
import { NewCompany, convertNewCompanyToDto } from '@dp/admin/company/types';
import {
  AllCompaniesApiResponse,
  CompanyByIdApiResponse,
} from '@dp/shared/company/data-access';
import { Company, convertDtoToCompany } from '@dp/shared/company/types';

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
