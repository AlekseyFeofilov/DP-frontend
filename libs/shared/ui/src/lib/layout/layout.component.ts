import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsBellComponent } from '@dp/shared/notification/ui';
import { NavigationItem } from '@dp/shared/types';
import { TuiLinkModule, TuiModeModule, TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'dp-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiSvgModule,
    TuiLinkModule,
    TuiModeModule,
    NotificationsBellComponent,
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
