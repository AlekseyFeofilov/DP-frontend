import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-admin-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-shell.component.html',
  styleUrl: './admin-shell.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShellComponent {}
