import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fromGroupStore } from './group-store.selectors';

@Injectable()
export class GroupStoreFacade {
  private readonly store = inject(Store);

  readonly groups$ = this.store.pipe(select(fromGroupStore.selectGroups));
}
