import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-admin-employment-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-employment-store.component.html',
  styleUrl: './admin-employment-store.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEmploymentStoreComponent {}
