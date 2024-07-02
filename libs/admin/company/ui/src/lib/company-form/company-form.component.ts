import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewCompany } from '@dp/admin/company/types';
import { FormValue } from '@dp/shared/types';
import {
  tuiIsPresent,
  tuiMarkControlAsTouchedAndValidate,
} from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import {
  TuiCheckboxLabeledModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputTagModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dp-company-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputTagModule,
    TuiInputNumberModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiTextareaModule,
    TuiCheckboxLabeledModule,
  ],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormComponent implements OnInit {
  @Input() initialValue?: NewCompany | null;
  @Output() readonly submitted = new EventEmitter<FormValue<NewCompany>>();

  readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tutor: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    contact: new FormControl<string>(''),
    communicationPlace: new FormControl<string>(''),
    vacancies: new FormControl<string>('', {
      nonNullable: true,
    }),
    vacanciesNumber: new FormControl<string>(''),
    isPartner: new FormControl<boolean>(true, {
      nonNullable: true,
    }),
    comment: new FormControl<string>(''),
  });

  readonly loading$ = new BehaviorSubject<boolean>(false);

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
        name: formValue.name,
        tutor: formValue.tutor,
        contact: formValue.contact,
        communicationPlace: formValue.communicationPlace,
        vacancies: formValue.vacancies,
        vacanciesNumber: formValue.vacanciesNumber,
        isPartner: formValue.isPartner,
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
    });
  }
}
