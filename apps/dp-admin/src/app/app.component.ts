import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SIDEBAR_NAVIGATION } from '@dp/admin/shared/consts';
import { LayoutComponent } from '@dp/shared/layout';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule, LayoutComponent],
  selector: 'dp-admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  readonly navigationItems = SIDEBAR_NAVIGATION;
}
