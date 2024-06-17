import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { normalizeRouteParam } from '@dp/shared/core';
import { FormValue } from '@dp/shared/types';
import { EmploymentVariantStoreFacade } from '@dp/student/employment-variant/store';
import { NewEmploymentVariant } from '@dp/student/employment-variant/types';
import { EmploymentVariantFormComponent } from '@dp/student/employment-variant/ui';
import { PATH_NAME } from '@dp/student/shared/consts';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { filter, map } from 'rxjs';

@Component({
  selector: 'dp-edit-employment-variant',
  standalone: true,
  imports: [CommonModule, EmploymentVariantFormComponent, TuiLoaderModule],
  templateUrl: './edit-employment-variant.component.html',
  styleUrl: './edit-employment-variant.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmploymentVariantComponent implements OnInit {
  private readonly employmentVariantStoreFacade = inject(
    EmploymentVariantStoreFacade,
  );
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading$ = this.employmentVariantStoreFacade.isLoading$;
  readonly employmentVariant$ =
    this.employmentVariantStoreFacade.selectedEmploymentVariant$.pipe(
      filter(tuiIsPresent),
      map(selected => {
        const { id, ...employmentVariant } = selected;
        return employmentVariant as NewEmploymentVariant;
      }),
    ); // TODO: создать хелпер

  private employmentVariantId!: string;

  ngOnInit(): void {
    this.employmentVariantId =
      this.route.snapshot.params[
        normalizeRouteParam(PATH_NAME.employmentVariantId)
      ];

    if (!this.employmentVariantId) {
      this.router.navigate([PATH_NAME.employmentVariant]);
      return;
    }

    this.employmentVariantStoreFacade.loadById(this.employmentVariantId);
  }

  onFormSubmit(formValue: FormValue<NewEmploymentVariant>): void {
    const finishCallback = () => {
      formValue.finishHandler?.();
      this.router.navigate([PATH_NAME.employmentVariant]);
    };

    this.employmentVariantStoreFacade.edit(
      this.employmentVariantId,
      formValue.value,
      finishCallback,
    );
  }
}
