import { Injectable, inject } from '@angular/core';
import { EmploymentVariant } from '@dp/shared/employment-variant/types';
import { StoreStateStatus } from '@dp/shared/types';
import { NewEmploymentVariant } from '@dp/student/employment-variant/types';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { employmentVariantActions } from './employment-variant-store.actions';
import { fromEmploymentVariantStore } from './employment-variant-store.selectors';

@Injectable()
export class EmploymentVariantStoreFacade {
  private readonly store = inject(Store);

  readonly employmentVariants$ = this.store.pipe(
    select(fromEmploymentVariantStore.selectAllEmploymentVariants),
  );
  readonly selectedEmploymentVariant$ = this.store.pipe(
    select(fromEmploymentVariantStore.selectSelectedEmploymentVariant),
  );

  readonly status$ = this.store.pipe(
    select(fromEmploymentVariantStore.selectStatus),
  );
  readonly isLoading$ = this.status$.pipe(
    map(status => status === StoreStateStatus.Loading),
  );

  load(): void {
    this.store.dispatch(employmentVariantActions.loadAll());
  }

  loadById(id: string): void {
    this.store.dispatch(employmentVariantActions.loadSelected({ id }));
  }

  create(
    newEmploymentVariant: NewEmploymentVariant,
    finishCallback?: () => void,
  ): void {
    this.store.dispatch(
      employmentVariantActions.create({ newEmploymentVariant, finishCallback }),
    );
  }

  edit(
    id: string,
    newEmploymentVariant: NewEmploymentVariant,
    finishCallback?: () => void,
  ): void {
    this.store.dispatch(
      employmentVariantActions.edit({
        id,
        newEmploymentVariant,
        finishCallback,
      }),
    );
  }

  remove(employmentVariant: EmploymentVariant): void {
    this.store.dispatch(
      employmentVariantActions.requestRemove({ employmentVariant }),
    );
  }
}
