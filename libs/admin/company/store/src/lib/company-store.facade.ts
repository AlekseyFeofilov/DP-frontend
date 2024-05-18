import { Injectable, inject } from '@angular/core';
import { NewCompany } from '@dp/admin/company/types';
import { StoreStateStatus } from '@dp/shared/types';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';

import { Company } from '@dp/shared/company/types';
import { companyActions } from './company-store.actions';
import { fromCompanyStore } from './company-store.selectors';

@Injectable()
export class CompanyStoreFacade {
  private readonly store = inject(Store);

  readonly companies$ = this.store.pipe(
    select(fromCompanyStore.selectAllCompanies),
  );
  readonly selectedCompany$ = this.store.pipe(
    select(fromCompanyStore.selectSelectedCompany),
  );

  readonly status$ = this.store.pipe(select(fromCompanyStore.selectStatus));
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(): void {
    this.store.dispatch(companyActions.loadAll());
  }

  loadById(id: string): void {
    this.store.dispatch(companyActions.loadSelected({ id }));
  }

  create(newCompany: NewCompany, finishCallback?: () => void): void {
    this.store.dispatch(companyActions.create({ newCompany, finishCallback }));
  }

  edit(id: string, newCompany: NewCompany, finishCallback?: () => void): void {
    this.store.dispatch(
      companyActions.edit({ id, newCompany, finishCallback }),
    );
  }

  remove(company: Company): void {
    this.store.dispatch(companyActions.requestRemove({ company }));
  }
}
