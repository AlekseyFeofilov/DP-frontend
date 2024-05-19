import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormValue } from '@dp/shared/types';
import { EmploymentVariantStoreFacade } from '@dp/student/employment-variant/store';
import { NewEmploymentVariant } from '@dp/student/employment-variant/types';
import { EmploymentVariantFormComponent } from '@dp/student/employment-variant/ui';
import { PATH_NAME } from '@dp/student/shared/consts';

@Component({
  selector: 'dp-new-employment-variant',
  standalone: true,
  imports: [CommonModule, EmploymentVariantFormComponent],
  templateUrl: './new-employment-variant.component.html',
  styleUrl: './new-employment-variant.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEmploymentVariantComponent {
  private readonly employmentVariantStoreFacade = inject(
    EmploymentVariantStoreFacade,
  );
  private readonly router = inject(Router);

  onFormSubmit(formValue: FormValue<NewEmploymentVariant>): void {
    const finishCallback = () => {
      formValue.finishHandler?.();
      this.router.navigate([PATH_NAME.employmentVariant]);
    };

    this.employmentVariantStoreFacade.create(formValue.value, finishCallback);
  }
}
