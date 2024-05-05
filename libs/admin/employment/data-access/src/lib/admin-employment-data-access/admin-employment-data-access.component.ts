import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-admin-employment-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-employment-data-access.component.html',
  styleUrl: './admin-employment-data-access.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEmploymentDataAccessComponent {}
