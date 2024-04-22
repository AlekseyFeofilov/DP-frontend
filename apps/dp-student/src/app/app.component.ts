import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@dp/shared/layout';
import { SIDEBAR_NAVIGATION } from '@dp/student/shared/consts';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule, LayoutComponent],
  selector: 'dp-student-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  readonly navigationItems = SIDEBAR_NAVIGATION;
}
