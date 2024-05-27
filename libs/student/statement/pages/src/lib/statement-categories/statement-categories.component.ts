import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STATEMENT_CATEGORIES } from '@dp/student/statement/consts';
import {
  TuiCardModule,
  TuiCellModule,
  TuiIconModule,
  TuiSurfaceModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';

@Component({
  selector: 'dp-statement-categories',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TuiIconModule,
    TuiCardModule,
    TuiCellModule,
    TuiSurfaceModule,
    TuiTitleModule,
  ],
  templateUrl: './statement-categories.component.html',
  styleUrl: './statement-categories.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatementCategoriesComponent {
  readonly categories = Object.values(STATEMENT_CATEGORIES);
}
