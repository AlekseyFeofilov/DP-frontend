import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmploymentVariantStatus } from '@dp/admin/employment/types';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import {
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
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

export interface EmploymentVariantForm {
  companyName: string;
  vacancy: string;
  status: EmploymentVariantStatus;
  priority: number;
  comment: string | null;
}

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
  ],
  providers: [
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
export class EmploymentVariantFormComponent {
  readonly form = new FormGroup({
    companyName: new FormControl<string | null>(null, {
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

  readonly companies = [
    'ЦФТ',
    'НТР',
    'red_mad_robot',
    'IndoorSoft',
    'MccSoft',
    'Креософт',
    'HITs',
  ] as const;

  // пофиксить зависимость от admin домена
  readonly statuses = Object.values(EmploymentVariantStatus);

  onSubmit(): void {
    tuiMarkControlAsTouchedAndValidate(this.form);
    console.log(this.form.value);
  }
}
