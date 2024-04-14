import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompaniesTableComponent } from '@dp/admin/company/ui';

@Component({
  selector: 'dp-all-companies',
  standalone: true,
  imports: [CommonModule, CompaniesTableComponent],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllCompaniesComponent {}
