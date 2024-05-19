import { CreateEmploymentVariantDto } from './create-employment-variant.dto';

export type EditEmploymentVariantDto = Omit<
  CreateEmploymentVariantDto,
  'employerId'
>;
