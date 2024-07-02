import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StudentStoreFacade } from '@dp/admin/student/store';
import { SEARCH_DEBOUNCE_TIME } from '@dp/shared/consts';
import { Group } from '@dp/shared/group/types';
import { GroupSelectComponent } from '@dp/shared/group/ui';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'dp-students-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  templateUrl: './students-filters.component.html',
  styleUrl: './students-filters.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsFiltersComponent implements OnInit {
  private readonly studentStoreFacade = inject(StudentStoreFacade);
  private readonly destroy$ = inject(TuiDestroyService);

  // TODO: убрать повторение этих фильтров в разных компонентах
  readonly studentNameControl = new FormControl<string | null>(null);
  readonly groupsControl = new FormControl<Group[]>([], { nonNullable: true });

  ngOnInit(): void {
    this.trackStudentNameControlChanges();
    this.trackGroupsControlChanges();
  }

  private trackStudentNameControlChanges(): void {
    this.studentNameControl.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_TIME), takeUntil(this.destroy$))
      .subscribe(value => {
        this.studentStoreFacade.setFilters({ studentName: value });
      });
  }

  private trackGroupsControlChanges(): void {
    this.groupsControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.studentStoreFacade.setFilters({
          groupIds: value.map(item => item.id),
        });
      });
  }
}
