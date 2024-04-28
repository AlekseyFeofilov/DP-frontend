import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CompanyStoreFacade } from '@dp/admin/company/store';
import { CompanyFormComponent } from '@dp/admin/company/ui';
import { NewCompany } from '@dp/admin/company/types';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { CommonModule } from '@angular/common';
import { FormValue } from '@dp/shared/types';
import { Router } from '@angular/router';

@Component({
  selector: 'dp-new-company',
  standalone: true,
  imports: [CommonModule, CompanyFormComponent],
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCompanyComponent {
  private readonly companyStoreFacade = inject(CompanyStoreFacade);
  private readonly router = inject(Router);

  onFormSubmit(formValue: FormValue<NewCompany>): void {
    const finishCallback = () => {
      formValue.finishHandler?.();
      this.router.navigate([PATH_NAME.company]);
    };

    this.companyStoreFacade.create(formValue.value, finishCallback);
  }
}
