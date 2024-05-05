import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-shared-employment-variant-dto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-employment-variant-dto.component.html',
  styleUrl: './shared-employment-variant-dto.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedEmploymentVariantDtoComponent {}
