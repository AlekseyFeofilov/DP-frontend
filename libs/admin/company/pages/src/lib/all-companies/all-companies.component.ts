import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompaniesTableComponent } from '@dp/admin/company/ui';
import { PATH_NAME } from '@dp/admin/shared/consts';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/experimental';

@Component({
  selector: 'dp-all-companies',
  standalone: true,
  imports: [CommonModule, RouterLink, CompaniesTableComponent, TuiButtonModule],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllCompaniesComponent {
  @tuiPure
  get createCompanyRoute(): string[] {
    return [PATH_NAME.create];
  }
}
