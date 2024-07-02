import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { EmploymentStoreFacade } from '@dp/admin/employment/store';
import {
  EmploymentsFiltersComponent,
  EmploymentsTableComponent,
} from '@dp/admin/employment/ui';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
  selector: 'dp-all-employments',
  standalone: true,
  imports: [
    CommonModule,
    EmploymentsTableComponent,
    EmploymentsFiltersComponent,
    TuiLoaderModule,
  ],
  templateUrl: './all-employments.component.html',
  styleUrl: './all-employments.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllEmploymentsComponent implements OnInit {
  private readonly employmentStoreFacade = inject(EmploymentStoreFacade);

  readonly isLoading$ = this.employmentStoreFacade.isLoading$;

  ngOnInit(): void {
    this.employmentStoreFacade.load();
  }
}
