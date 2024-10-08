import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmploymentStoreFacade } from '@dp/admin/employment/store';
import { EmploymentStudentStatus } from '@dp/admin/employment/types';
import { SEARCH_DEBOUNCE_TIME } from '@dp/shared/consts';
import { Group } from '@dp/shared/group/types';
import { GroupSelectComponent } from '@dp/shared/group/ui';
import { FiltersWithAllComponent } from '@dp/shared/ui';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/experimental';
import {
  TuiInputModule,
  TuiTabsModule,
  tuiItemsHandlersProvider,
} from '@taiga-ui/kit';
import { debounceTime, map, takeUntil } from 'rxjs';

@Component({
  selector: 'dp-employments-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiTabsModule,
    TuiBadgeModule,
    FiltersWithAllComponent,
    TuiInputModule,
    GroupSelectComponent,
    TuiTextfieldControllerModule,
  ],
  providers: [
    TuiDestroyService,
    tuiItemsHandlersProvider({
      stringify: (group: Group) => group.number.toString(),
    }),
  ],
  templateUrl: './employments-filters.component.html',
  styleUrl: './employments-filters.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmploymentsFiltersComponent implements OnInit {
  private readonly employmentStoreFacade = inject(EmploymentStoreFacade);
  private readonly destroy$ = inject(TuiDestroyService);

  private readonly statusesControl = new FormControl<EmploymentStudentStatus[]>(
    [],
    {
      nonNullable: true,
    },
  );

  readonly statusesControl$ = this.employmentStoreFacade.filters$.pipe(
    map(({ statuses }) => {
      this.statusesControl.setValue([...statuses], { emitEvent: false });
      return this.statusesControl;
    }),
  );

  readonly statusesCapacity$ = this.employmentStoreFacade.statusesCapacity$;

  readonly statuses = Object.values(EmploymentStudentStatus);

  // TODO: убрать повторение этих фильтров в разных компонентах
  readonly studentNameControl = new FormControl<string | null>(null);
  readonly companyNameControl = new FormControl<string | null>(null);
  readonly vacancyNameControl = new FormControl<string | null>(null);
  readonly groupsControl = new FormControl<Group[]>([], { nonNullable: true });

  ngOnInit(): void {
    this.trackStudentNameControlChanges();
    this.trackCompanyNameControlChanges();
    this.trackVacancyNameControlChanges();
    this.trackGroupsControlChanges();
    this.trackFiltersControlChanges();
  }

  private trackFiltersControlChanges(): void {
    this.statusesControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.employmentStoreFacade.setFilters({
          statuses: value,
        });
      });
  }

  private trackStudentNameControlChanges(): void {
    this.studentNameControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME), takeUntil(this.destroy$))
      .subscribe(value => {
        this.employmentStoreFacade.setFilters({ studentName: value });
      });
  }

  private trackCompanyNameControlChanges(): void {
    this.companyNameControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME), takeUntil(this.destroy$))
      .subscribe(value => {
        this.employmentStoreFacade.setFilters({ companyName: value });
      });
  }

  private trackVacancyNameControlChanges(): void {
    this.vacancyNameControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME), takeUntil(this.destroy$))
      .subscribe(value => {
        this.employmentStoreFacade.setFilters({ vacancyName: value });
      });
  }

  private trackGroupsControlChanges(): void {
    this.groupsControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.employmentStoreFacade.setFilters({
          groupIds: value.map(item => item.id),
        });
      });
  }
}
