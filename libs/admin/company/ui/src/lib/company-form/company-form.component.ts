import {
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import {
  TuiInputNumberModule,
  TuiInputTagModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import {
  tuiMarkControlAsTouchedAndValidate,
  tuiIsPresent,
} from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { NewCompany } from '@dp/admin/company/types';
import { CommonModule } from '@angular/common';
import { FormValue } from '@dp/shared/types';
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
    spokesman: new FormControl<string>(''),
    contact: new FormControl<string>(''),
    vacancies: new FormControl<string[]>([], {
      nonNullable: true,
    }),
    vacanciesNumber: new FormControl<number | null>(null),
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
        spokesman: '',
        contact: formValue.contact,
        vacancies: [],
        vacanciesNumber: formValue.vacanciesNumber,
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
