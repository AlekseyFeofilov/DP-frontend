import { EmploymentVariant } from '@dp/shared/employment-variant/types';
import { NewEmploymentVariant } from '@dp/student/employment-variant/types';
import { createAction, props } from '@ngrx/store';

import { EMPLOYMENT_VARIANT_STORE_FEATURE_KEY } from './employment-variant-store.key';

const loadAll = createAction(
  `[${EMPLOYMENT_VARIANT_STORE_FEATURE_KEY}] load all employment variants`,
);

const loadAllSuccess = createAction(
  `[${EMPLOYMENT_VARIANT_STORE_FEATURE_KEY}] load all employment variants success`,
  props<{ readonly employmentVariants: ReadonlyArray<EmploymentVariant> }>(),
);

const loadSelected = createAction(
  `[${EMPLOYMENT_VARIANT_STORE_FEATURE_KEY}] load selected employment variant`,
  props<{ readonly id: string }>(),
);

const loadSelectedSuccess = createAction(
  `[${EMPLOYMENT_VARIANT_STORE_FEATURE_KEY}] load selected employment variant success`,
  props<{ readonly employmentVariant: EmploymentVariant }>(),
);

const create = createAction(
  `[${EMPLOYMENT_VARIANT_STORE_FEATURE_KEY}] create an employment variant`,
  props<{
    readonly newEmploymentVariant: NewEmploymentVariant;
    readonly finishCallback?: () => void;
  }>(),
);

const edit = createAction(
  `[${EMPLOYMENT_VARIANT_STORE_FEATURE_KEY}] edit an employment variant`,
  props<{
    readonly id: string;
    readonly newEmploymentVariant: NewEmploymentVariant;
    readonly finishCallback?: () => void;
  }>(),
);

const requestRemove = createAction(
  `[${EMPLOYMENT_VARIANT_STORE_FEATURE_KEY}] request for removing an employment variant`,
  props<{
    readonly employmentVariant: EmploymentVariant;
  }>(),
);

const remove = createAction(
  `[${EMPLOYMENT_VARIANT_STORE_FEATURE_KEY}] remove an employment variant`,
  props<{
    readonly employmentVariant: EmploymentVariant;
  }>(),
);

export const employmentVariantActions = {
  loadAll,
  loadAllSuccess,
  loadSelected,
  loadSelectedSuccess,
  create,
  edit,
  requestRemove,
  remove,
};
