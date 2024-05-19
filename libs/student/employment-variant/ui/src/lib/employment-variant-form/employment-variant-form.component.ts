import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
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
import { EMPLOYMENT_VARIANT_PRIORITY } from '@dp/shared/employment-variant/consts';
import { EmploymentVariantStatus } from '@dp/shared/employment-variant/types';
import { FormMode, FormValue, SelectItem } from '@dp/shared/types';
import { NewEmploymentVariant } from '@dp/student/employment-variant/types';
import {
  tuiIsPresent,
  tuiMarkControlAsTouchedAndValidate,
} from '@taiga-ui/cdk';
import {
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import {
  TUI_VALIDATION_ERRORS,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';
import { BehaviorSubject, map, shareReplay } from 'rxjs';

@Component({
  selector: 'dp-employment-variant-form',
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
    TuiRadioBlockModule,
    TuiGroupModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiNotificationModule,
  ],
  providers: [
    CompanyCommonApiService,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Выбор приоритета обязателен',
      },
    },
  ],
  templateUrl: './employment-variant-form.component.html',
  styleUrl: './employment-variant-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmploymentVariantFormComponent implements OnInit {
  @Input() initialValue?: NewEmploymentVariant | null;
  @Input() mode: FormMode = 'create';

  @Output() readonly submitted = new EventEmitter<
    FormValue<NewEmploymentVariant>
  >();

  private readonly companyApiService = inject(CompanyCommonApiService);

  readonly loading$ = new BehaviorSubject<boolean>(false);

  readonly form = new FormGroup({
    company: new FormControl<SelectItem | null>(null, {
      validators: [Validators.required],
    }),
    vacancy: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    priority: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    status: new FormControl<EmploymentVariantStatus>(
      EmploymentVariantStatus.NoInfo,
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),
    comment: new FormControl<string>(''),
  });

  readonly priorities = EMPLOYMENT_VARIANT_PRIORITY;

  readonly companies$ = this.companyApiService.getAll().pipe(
    filterPartners,
    map(companies =>
      companies.map(company => new SelectItem(company.id, company.companyName)),
    ),
    shareReplay(1),
  );

  readonly statuses = Object.values(EmploymentVariantStatus);

  get isEditMode() {
    return this.mode === 'edit';
  }

  ngOnInit(): void {
    this.assignInitialValues();
  }

  onSubmit(): void {
    tuiMarkControlAsTouchedAndValidate(this.form);

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();

    this.loading$.next(true);

    this.submitted.next({
      value: {
        company: {
          id: formValue.company!.key,
          name: formValue.company!.value,
        },
        vacancy: formValue.vacancy,
        status: formValue.status,
        priority: formValue.priority!,
        comment: formValue.comment,
      },
      finishHandler: this.handleFinish.bind(this),
    });
  }

  private handleFinish(): void {
    this.loading$.next(false);
  }

  private assignInitialValues(): void {
    if (!tuiIsPresent(this.initialValue)) {
      return;
    }

    this.form.setValue({
      ...this.initialValue,
      company: new SelectItem(
        this.initialValue.company.id,
        this.initialValue.company.name,
      ),
    });
  }
}
