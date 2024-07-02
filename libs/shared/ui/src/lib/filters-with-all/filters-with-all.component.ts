import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltersCapacity } from '@dp/shared/types';
import { AbstractTuiControl, TuiHandler, tuiPure } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButtonModule } from '@taiga-ui/core';
import { TuiFilterModule } from '@taiga-ui/kit';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'dp-filters-with-all',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiFilterModule, TuiButtonModule],
  templateUrl: './filters-with-all.component.html',
  styleUrl: './filters-with-all.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersWithAllComponent extends AbstractTuiControl<string[]> {
  @Input() set filtersCapacitiy(value: FiltersCapacity<string> | null) {
    this.badgeHandler = item => value?.[item] ?? 0;
  }

  @Input() filters: string[] = [];

  override focused = false;

  private readonly choosenFilters$ = new BehaviorSubject<readonly string[]>([]);

  badgeHandler!: TuiHandler<string, number>;

  @tuiPure
  get model$(): Observable<readonly string[]> {
    return this.choosenFilters$.pipe(
      map(filter => (filter.length === this.filters.length ? [] : filter)),
    );
  }

  @tuiPure
  get buttonAppearance$(): Observable<TuiAppearance> {
    return this.choosenFilters$.pipe(
      map(value =>
        value.length === this.filters.length
          ? TuiAppearance.WhiteblockActive
          : TuiAppearance.Whiteblock,
      ),
    );
  }

  override writeValue(value: string[] | null): void {
    if (value) {
      this.choosenFilters$.next(value);
    }
    super.writeValue(value);
  }

  onModelChange(value: string[]): void {
    this.value = value;
    this.choosenFilters$.next(value);
  }

  toggleAll(): void {
    this.value = this.filters;
    this.choosenFilters$.next(
      this.filters.length === this.choosenFilters$.value.length
        ? []
        : this.filters,
    );
  }

  protected override getFallbackValue(): string[] {
    return [];
  }
}
