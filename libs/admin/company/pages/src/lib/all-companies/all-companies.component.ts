import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CompaniesTableComponent } from '@dp/admin/company/ui';
import { CompanyStoreFacade } from '@dp/admin/company/store';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { Company } from '@dp/admin/company/types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';

@Component({
  selector: 'dp-all-companies',
  standalone: true,
  imports: [CommonModule, RouterLink, CompaniesTableComponent, TuiButtonModule],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllCompaniesComponent implements OnInit {
  private readonly companyStoreFacade = inject(CompanyStoreFacade);

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
