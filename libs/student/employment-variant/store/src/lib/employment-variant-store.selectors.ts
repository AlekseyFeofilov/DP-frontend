import { employmentVariantStore } from './employment-variant-store.reducer';

const {
  selectAllEmploymentVariants,
  selectSelectedEmploymentVariant,
  selectStatus,
} = employmentVariantStore;

export const fromEmploymentVariantStore = {
  selectAllEmploymentVariants,
  selectSelectedEmploymentVariant,
  selectStatus,
};
