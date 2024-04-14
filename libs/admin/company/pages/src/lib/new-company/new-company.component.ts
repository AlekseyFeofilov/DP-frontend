import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompanyFormComponent } from '@dp/admin/company/ui';

@Component({
  selector: 'dp-new-company',
  standalone: true,
  imports: [CommonModule, CompanyFormComponent],
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCompanyComponent {}
