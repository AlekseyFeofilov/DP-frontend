import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-company-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormComponent {}
