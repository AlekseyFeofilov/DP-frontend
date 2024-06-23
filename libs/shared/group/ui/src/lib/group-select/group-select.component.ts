import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupStoreFacade } from '@dp/shared/group/store';
import { Group } from '@dp/shared/group/types';
import {
  AbstractTuiControl,
  TuiLetModule,
  TuiMapperPipeModule,
} from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiMultiSelectModule } from '@taiga-ui/kit';
import { BehaviorSubject, map, tap } from 'rxjs';

@Component({
  selector: 'dp-group-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiMapperPipeModule,
    TuiLetModule,
  ],
  templateUrl: './group-select.component.html',
  styleUrl: './group-select.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSelectComponent extends AbstractTuiControl<Group[]> {
  private readonly groupStoreFacade = inject(GroupStoreFacade);

  override focused = false;

  readonly groups$ = this.groupStoreFacade.groups$.pipe(
    tap(groups => {
      this.onModelChange([...groups]);
    }),
    map(groups =>
      groups.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.grade]: [...(prev[curr.grade] ?? []), curr],
        }),
        {} as Record<string, Group[]>,
      ),
    ),
  );

  readonly choosenGrops$ = new BehaviorSubject<readonly Group[]>([]);

  getGrades(groups: Record<string, Group[]>): string[] {
    return Object.keys(groups);
  }

  onModelChange(value: Group[]): void {
    this.value = value;
    this.choosenGrops$.next(value);
    this.cdr.detectChanges();
  }

  protected override getFallbackValue(): Group[] {
    return [];
  }
}
