import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyStoreFacade } from '@dp/admin/company/store';
import { NewCompany } from '@dp/admin/company/types';
import { CompanyFormComponent } from '@dp/admin/company/ui';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { FormValue } from '@dp/shared/types';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { filter, map } from 'rxjs';

@Component({
  selector: 'dp-edit-company',
  standalone: true,
  imports: [CommonModule, CompanyFormComponent, TuiLoaderModule],
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCompanyComponent implements OnInit {
  private readonly companyStoreFacade = inject(CompanyStoreFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading$ = this.companyStoreFacade.isLoading$;
  readonly company$ = this.companyStoreFacade.selectedCompany$.pipe(
    filter(tuiIsPresent),
    map(selectedCompany => {
      const { id, ...company } = selectedCompany;
      return company as NewCompany;
    }),
  ); // TODO: создать хелпер

  private companyId!: string;

  ngOnInit(): void {
    this.companyId =
      this.route.snapshot.params[PATH_NAME.companyId.replace(':', '')]; // TODO: создать хелпер

    if (!this.companyId) {
      this.router.navigate([PATH_NAME.company]);
      return;
    }

    this.companyStoreFacade.loadById(this.companyId);
  }

  onFormSubmit(formValue: FormValue<NewCompany>): void {
    const finishCallback = () => {
      formValue.finishHandler?.();
      this.router.navigate([PATH_NAME.company]);
    };

    this.companyStoreFacade.edit(
      this.companyId,
      formValue.value,
      finishCallback,
    );
  }
}
