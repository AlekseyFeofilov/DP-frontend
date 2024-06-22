import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StatementStoreFacade } from '@dp/admin/statement/store';
import { SEARCH_DEBOUNCE_TIME } from '@dp/shared/consts';
import { Group } from '@dp/shared/group/types';
import { GroupSelectComponent } from '@dp/shared/group/ui';
import { TuiDestroyService, TuiMapperPipeModule } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiMultiSelectModule,
  tuiItemsHandlersProvider,
} from '@taiga-ui/kit';
import { debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'dp-statement-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiMultiSelectModule,
    TuiDataListModule,
    TuiMapperPipeModule,
    GroupSelectComponent,
  ],
  providers: [
    TuiDestroyService,
    tuiItemsHandlersProvider({
      stringify: (group: Group) => group.number.toString(),
    }),
  ],
  templateUrl: './statement-filters.component.html',
  styleUrl: './statement-filters.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatementFiltersComponent implements OnInit {
  private readonly statementStoreFacade = inject(StatementStoreFacade);
  private readonly destroy$ = inject(TuiDestroyService);

  readonly studentNameControl = new FormControl<string | null>(null);
  readonly companyNameControl = new FormControl<string | null>(null);
  readonly vacancyNameControl = new FormControl<string | null>(null);
  readonly groupsControl = new FormControl<Group[]>([], { nonNullable: true });

  ngOnInit(): void {
    this.trackStudentNameControlChanges();
    this.trackCompanyNameControlChanges();
    this.trackVacancyNameControlChanges();
    this.trackGroupsControlChanges();
  }

  private trackStudentNameControlChanges(): void {
    this.studentNameControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME), takeUntil(this.destroy$))
      .subscribe(value => {
        this.statementStoreFacade.setFilters({ studentName: value });
      });
  }

  private trackCompanyNameControlChanges(): void {
    this.companyNameControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME), takeUntil(this.destroy$))
      .subscribe(value => {
        this.statementStoreFacade.setFilters({ companyName: value });
      });
  }

  private trackVacancyNameControlChanges(): void {
    this.vacancyNameControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME), takeUntil(this.destroy$))
      .subscribe(value => {
        this.statementStoreFacade.setFilters({ vacancyName: value });
      });
  }

  private trackGroupsControlChanges(): void {
    this.groupsControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.statementStoreFacade.setFilters({
          groupIds: value.map(item => item.id),
        });
      });
  }
}
