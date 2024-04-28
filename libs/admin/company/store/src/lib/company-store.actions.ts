import { Company, NewCompany } from '@dp/admin/company/types';
import { createAction, props } from '@ngrx/store';

import { COMPANY_STORE_FEATURE_KEY } from './company-store.key';

const loadAll = createAction(
  `[${COMPANY_STORE_FEATURE_KEY}] load all companies`,
);

const loadAllSuccess = createAction(
  `[${COMPANY_STORE_FEATURE_KEY}] load all companies success`,
  props<{ readonly companies: ReadonlyArray<Company> }>(),
);

const loadSelected = createAction(
  `[${COMPANY_STORE_FEATURE_KEY}] load selected company`,
  props<{ readonly id: string }>(),
);

const loadSelectedSuccess = createAction(
  `[${COMPANY_STORE_FEATURE_KEY}] load selected company success`,
  props<{ readonly company: Company }>(),
);

const create = createAction(
  `[${COMPANY_STORE_FEATURE_KEY}] create a company`,
  props<{
    readonly newCompany: NewCompany;
    readonly finishCallback?: () => void;
  }>(),
);

const edit = createAction(
  `[${COMPANY_STORE_FEATURE_KEY}] edit a company`,
  props<{
    readonly id: string;
    readonly newCompany: NewCompany;
    readonly finishCallback?: () => void;
  }>(),
);

const requestRemove = createAction(
  `[${COMPANY_STORE_FEATURE_KEY}] request for removing a company`,
  props<{
    readonly company: Company;
  }>(),
);

const remove = createAction(
  `[${COMPANY_STORE_FEATURE_KEY}] remove a company`,
  props<{
    readonly company: Company;
  }>(),
);

export const companyActions = {
  loadAll,
  loadAllSuccess,
  loadSelected,
  loadSelectedSuccess,
  create,
  edit,
  requestRemove,
  remove,
};
