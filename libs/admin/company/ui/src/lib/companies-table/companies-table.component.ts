import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-companies-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companies-table.component.html',
  styleUrl: './companies-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesTableComponent {}
