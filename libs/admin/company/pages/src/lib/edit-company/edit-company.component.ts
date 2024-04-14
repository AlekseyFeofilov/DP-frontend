import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompanyFormComponent } from '@dp/admin/company/ui';

@Component({
  selector: 'dp-edit-company',
  standalone: true,
  imports: [CommonModule, CompanyFormComponent],
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCompanyComponent {}
