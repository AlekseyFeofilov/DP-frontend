import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SIDEBAR_NAVIGATION } from '@dp/admin/shared/consts';
import { LayoutComponent } from '@dp/shared/layout';
import { TuiRootModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TuiRootModule,
    TuiSvgModule,
    TuiButtonModule,
    LayoutComponent,
  ],
  selector: 'dp-admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  readonly navigationItems = SIDEBAR_NAVIGATION;
}
