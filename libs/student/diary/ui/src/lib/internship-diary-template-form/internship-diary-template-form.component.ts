import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValue } from '@dp/shared/types';
import { NewInternshipDiaryTemplate } from '@dp/student/diary/types';
import {
  TuiDay,
  TuiDayRange,
  TuiTime,
  tuiMarkControlAsTouchedAndValidate,
} from '@taiga-ui/cdk';
import {
  TuiLinkModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import {
  TuiAccordionModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputTimeModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';
import * as lodash from 'lodash';

@Component({
  selector: 'dp-internship-diary-template-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiInputNumberModule,
    TuiInputDateModule,
    TuiInputTimeModule,
    TuiInputDateRangeModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiNotificationModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './internship-diary-template-form.component.html',
  styleUrl: './internship-diary-template-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryTemplateFormComponent {
  @Input({ required: true }) statementId!: string;

  @Output() readonly submitted = new EventEmitter<
    FormValue<NewInternshipDiaryTemplate>
  >();

  private readonly taskControlDefault = new FormGroup({
    dateRange: new FormControl<TuiDayRange | null>(null, {
      validators: [Validators.required],
    }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    spentTime: new FormControl<TuiTime | null>(null, {
      validators: [Validators.required],
    }),
  });

  readonly form = new FormGroup({
    tasks: new FormArray([lodash.cloneDeep(this.taskControlDefault)]),
    assessment: new FormGroup({
      mark: new FormControl<number | null>(null, {
        validators: [Validators.required],
      }),
      text: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      date: new FormControl<TuiDay>(TuiDay.currentLocal(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
  });

  addTaskControl(): void {
    this.form.controls.tasks.push(lodash.cloneDeep(this.taskControlDefault));
  }

  deleteTaskControl(index: number): void {
    this.form.controls.tasks.removeAt(index);
  }

  onSubmit(): void {
    tuiMarkControlAsTouchedAndValidate(this.form);

    if (this.form.invalid) {
      return;
    }

    const { tasks, assessment } = this.form.getRawValue();

    this.submitted.next({
      value: {
        statementId: this.statementId,
        tasks: tasks.map(taskControl => ({
          beginDate: taskControl.dateRange!.from,
          endDate: taskControl.dateRange!.to,
          name: taskControl.name,
          spentTime: taskControl.spentTime!,
        })),
        assessment: {
          mark: assessment.mark!,
          text: assessment.text,
          date: assessment.date,
        },
      },
    });
  }
}
