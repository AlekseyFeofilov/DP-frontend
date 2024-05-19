import {
  EmploymentVariant,
  convertDtoToEmploymentVariant,
} from '@dp/shared/employment-variant/types';
import {
  AllEmploymentVariantsApiResponse,
  CreateEmploymentVariantApiRequest,
  EditEmploymentVariantApiRequest,
  EmploymentVariantByIdApiResponse,
} from '@dp/student/employment-variant/data-access';
import {
  NewEmploymentVariant,
  convertNewEmploymentVariantToCreateDto,
  convertNewEmploymentVariantToEditDto,
} from '@dp/student/employment-variant/types';

export namespace EmploymentVariantApiAdapterHelper {
  export function parseAllEmploymentVariantsApiResponse(
    apiResponse: AllEmploymentVariantsApiResponse,
  ): EmploymentVariant[] {
    return apiResponse.map(dto => convertDtoToEmploymentVariant(dto));
  }

  export function parseEmploymentVariantByIdApiResponse(
    apiResponse: EmploymentVariantByIdApiResponse,
  ): EmploymentVariant {
    return convertDtoToEmploymentVariant(apiResponse);
  }

  export function parseCreateEmploymentVariantApiRequest(
    newEmploymentVariant: NewEmploymentVariant,
  ): CreateEmploymentVariantApiRequest {
    return {
      payload: convertNewEmploymentVariantToCreateDto(newEmploymentVariant),
    };
  }

  export function parseEditEmploymentVariantApiRequest(
    id: string,
    newEmploymentVariant: NewEmploymentVariant,
  ): EditEmploymentVariantApiRequest {
    return {
      id,
      payload: convertNewEmploymentVariantToEditDto(newEmploymentVariant),
    };
  }
}
