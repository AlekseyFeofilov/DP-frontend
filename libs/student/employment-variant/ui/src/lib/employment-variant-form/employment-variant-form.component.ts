import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TUI_VALIDATION_ERRORS,
  TuiRadioBlockModule,
  TuiTextareaModule,
  TuiSelectModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import {
  TuiTextfieldControllerModule,
  TuiNotificationModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
} from '@taiga-ui/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { EmploymentVariantStatus } from '@dp/shared/employment-variant/types';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { CommonModule } from '@angular/common';

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
    TuiNotificationModule,
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

  // TODO пофиксить зависимость от admin домена
  readonly statuses = Object.values(EmploymentVariantStatus);

  onSubmit(): void {
    tuiMarkControlAsTouchedAndValidate(this.form);
    console.log(this.form.value);
  }
}
