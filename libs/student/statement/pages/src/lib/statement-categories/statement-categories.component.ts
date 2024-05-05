import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PATH_NAME } from '@dp/student/shared/consts';
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
  get createInternshipStatementPath(): string[] {
    return ['', PATH_NAME.statement, PATH_NAME.create, PATH_NAME.internship];
  }
}
