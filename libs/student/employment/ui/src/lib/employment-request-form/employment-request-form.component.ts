import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

export interface EmploymentRequestForm {
  companyName: string;
  vacancy: string;
  comment: string | null;
}

@Component({
  selector: 'dp-employment-request-form',
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
  templateUrl: './employment-request-form.component.html',
  styleUrl: './employment-request-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmploymentRequestFormComponent {
  readonly form = new FormGroup({
    companyName: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    vacancy: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
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
  ];

  onSubmit(): void {
    tuiMarkControlAsTouchedAndValidate(this.form);
    console.log(this.form.value);
  }
}
