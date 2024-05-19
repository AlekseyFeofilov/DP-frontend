import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompanyStoreFacade } from '@dp/admin/company/store';
import { CompaniesTableComponent } from '@dp/admin/company/ui';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { Company } from '@dp/shared/company/types';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';

@Component({
  selector: 'dp-all-companies',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CompaniesTableComponent,
    TuiButtonModule,
    TuiLoaderModule,
  ],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllCompaniesComponent implements OnInit {
  private readonly companyStoreFacade = inject(CompanyStoreFacade);

  readonly isLoading$ = this.companyStoreFacade.isLoading$;

  @tuiPure
  get createCompanyRoute(): string[] {
    return [PATH_NAME.create];
  }

  ngOnInit(): void {
    this.companyStoreFacade.load();
  }

  onRemove(company: Company): void {
    this.companyStoreFacade.remove(company);
  }
}
