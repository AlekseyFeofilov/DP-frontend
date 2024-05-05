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
import { FormValue, SelectItem } from '@dp/shared/types';
import { CompanyApiService } from '@dp/student/statement/data-access';
import { NewIntrenshipStatement } from '@dp/student/statement/types';
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
  selector: 'dp-internship-statement-form',
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
  providers: [CompanyApiService],
  templateUrl: './internship-statement-form.component.html',
  styleUrl: './internship-statement-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipStatementFormComponent {
  @Output() readonly submitted = new EventEmitter<
    FormValue<NewIntrenshipStatement>
  >();

  private readonly companyApiService = inject(CompanyApiService);

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

  readonly companies$ = this.companyApiService.getAllPartners().pipe(
    shareReplay(),
    map(companies =>
      companies.map(company => new SelectItem(company.id, company.companyName)),
    ),
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
