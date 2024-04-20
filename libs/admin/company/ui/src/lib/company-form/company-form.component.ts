import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputTagModule,
} from '@taiga-ui/kit';

export interface CompanyForm {
  name: string;
  spokesman: string | null;
  contact: string | null;
  vacancies: ReadonlyArray<string>;
  vacanciesNumber: number | null;
}

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
export class CompanyFormComponent {
  readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    spokesman: new FormControl<string>(''),
    contact: new FormControl<string>(''),
    vacancies: new FormControl<string[]>([]),
    vacanciesNumber: new FormControl<number | null>(null),
  });

  onSubmit(): void {
    tuiMarkControlAsTouchedAndValidate(this.form);
    console.log(this.form.value);
  }
}
