import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormValue } from '@dp/shared/types';
import { PATH_NAME } from '@dp/student/shared/consts';
import { StatementStoreFacade } from '@dp/student/statement/store';
import { NewIntrenshipCheckStatement } from '@dp/student/statement/types';
import { InternshipCheckStatementFormComponent } from '@dp/student/statement/ui';

@Component({
  selector: 'dp-new-internship-statement',
  standalone: true,
  imports: [CommonModule, InternshipCheckStatementFormComponent],
  templateUrl: './new-internship-statement.component.html',
  styleUrl: './new-internship-statement.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewInternshipStatementComponent {
  private readonly statementStoreFacade = inject(StatementStoreFacade);
  private readonly router = inject(Router);

  onFormSubmit(formValue: FormValue<NewIntrenshipCheckStatement>): void {
    const finishCallback = () => {
      formValue.finishHandler?.();
      this.router.navigate([
        '',
        PATH_NAME.statement,
        PATH_NAME.internshipCheck,
      ]);
    };

    this.statementStoreFacade.createInternshipCheck(
      formValue.value,
      finishCallback,
    );
  }
}
