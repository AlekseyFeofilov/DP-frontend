import { EMPLOYMENT_VARIANT_STATUS_MAP_TO_DTO } from '@dp/shared/employment-variant/types';
import {
  CreateEmploymentVariantDto,
  EditEmploymentVariantDto,
} from '@dp/student/employment-variant/dto';
import { NewEmploymentVariant } from '../models';

export function convertNewEmploymentVariantToCreateDto(
  newEmploymentVariant: NewEmploymentVariant,
): CreateEmploymentVariantDto {
  return {
    employerId: newEmploymentVariant.company.id,
    occupation: newEmploymentVariant.vacancy,
    status: EMPLOYMENT_VARIANT_STATUS_MAP_TO_DTO[newEmploymentVariant.status],
    priority: newEmploymentVariant.priority,
    comment: newEmploymentVariant.comment,
  };
}

export function convertNewEmploymentVariantToEditDto(
  newEmploymentVariant: NewEmploymentVariant,
): EditEmploymentVariantDto {
  return {
    occupation: newEmploymentVariant.vacancy,
    status: EMPLOYMENT_VARIANT_STATUS_MAP_TO_DTO[newEmploymentVariant.status],
    priority: newEmploymentVariant.priority,
    comment: newEmploymentVariant.comment,
  };
}
