import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiLinkModule, TuiModeModule, TuiSvgModule } from '@taiga-ui/core';
import { NavigationItem } from '../types/navigation-item';

@Component({
  selector: 'dp-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiSvgModule,
    TuiLinkModule,
    TuiModeModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly location = inject(Location);
  @Input({ required: true }) items: ReadonlyArray<NavigationItem> = [];

  navigateBack(): void {
    this.location.back();
  }
}
