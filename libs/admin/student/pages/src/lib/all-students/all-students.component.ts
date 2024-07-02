import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { StudentStoreFacade } from '@dp/admin/student/store';
import {
  StudentsFiltersComponent,
  StudentsTableComponent,
} from '@dp/admin/student/ui';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
  selector: 'dp-all-students',
  standalone: true,
  imports: [
    CommonModule,
    TuiLoaderModule,
    StudentsTableComponent,
    StudentsFiltersComponent,
  ],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllStudentsComponent implements OnInit {
  private readonly studentStoreFacade = inject(StudentStoreFacade);

  readonly students$ = this.studentStoreFacade.students$;
  readonly isLoading$ = this.studentStoreFacade.isLoading$;

  ngOnInit(): void {
    this.studentStoreFacade.loadAll();
  }
}
