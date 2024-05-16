import {
  EmploymentsFiltersComponent,
  EmploymentsTableComponent,
} from '@dp/admin/employment/ui';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { EmploymentStoreFacade } from '@dp/admin/employment/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-all-employments',
  standalone: true,
  imports: [
    CommonModule,
    EmploymentsTableComponent,
    EmploymentsFiltersComponent,
  ],
  templateUrl: './all-employments.component.html',
  styleUrl: './all-employments.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllEmploymentsComponent implements OnInit {
  private readonly employmentStoreFacade = inject(EmploymentStoreFacade);

  ngOnInit(): void {
    this.employmentStoreFacade.load();
  }
}
