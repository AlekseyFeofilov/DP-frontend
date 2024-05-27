import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyCommonApiService } from '@dp/shared/company/data-access';
import { filterPartners } from '@dp/shared/company/utils';
import { FormValue, SelectItem } from '@dp/shared/types';
import { NewIntrenshipCheckStatement } from '@dp/student/statement/types';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import {
  TuiHintModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiSelectModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';
import { BehaviorSubject, map, shareReplay } from 'rxjs';

export interface InternshipStatementForm {
  companyName: string;
  vacancy: string;
  comment: string | null;
}

@Component({
  selector: 'dp-internship-check-statement-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiTextareaModule,
    TuiHintModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiNotificationModule,
  ],
  providers: [CompanyCommonApiService],
  templateUrl: './internship-check-statement-form.component.html',
  styleUrl: './internship-check-statement-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipCheckStatementFormComponent {
  @Output() readonly submitted = new EventEmitter<
    FormValue<NewIntrenshipCheckStatement>
  >();

  private readonly companyApiService = inject(CompanyCommonApiService);

  readonly loading$ = new BehaviorSubject<boolean>(false);

  readonly form = new FormGroup({
    company: new FormControl<SelectItem | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    vacancy: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    comment: new FormControl<string>(''),
  });

  readonly companies$ = this.companyApiService.getAll().pipe(
    filterPartners,
    map(companies =>
      companies.map(company => new SelectItem(company.id, company.companyName)),
    ),
    shareReplay(1),
  );

  onSubmit(): void {
    tuiMarkControlAsTouchedAndValidate(this.form);

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();

    this.loading$.next(true);

    this.submitted.next({
      value: {
        companyId: formValue.company!.key,
        vacancy: formValue.vacancy,
        comment: formValue.comment,
      },
      finishHandler: this.handleFinish.bind(this),
    });
  }

  private handleFinish(): void {
    this.loading$.next(false);
  }
}
