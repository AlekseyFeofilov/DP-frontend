import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmploymentVariant } from '@dp/shared/employment-variant/types';
import { EmploymentVariantsTableComponent } from '@dp/shared/employment-variant/ui';
import { EmploymentVariantStoreFacade } from '@dp/student/employment-variant/store';
import { PATH_NAME } from '@dp/student/shared/consts';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';

@Component({
  selector: 'dp-all-employment-variants',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EmploymentVariantsTableComponent,
    TuiButtonModule,
    TuiLoaderModule,
  ],
  templateUrl: './all-employment-variants.component.html',
  styleUrl: './all-employment-variants.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllEmploymentVariantsComponent implements OnInit {
  private readonly employmentVariantStoreFacade = inject(
    EmploymentVariantStoreFacade,
  );

  readonly employmentVariants$ =
    this.employmentVariantStoreFacade.employmentVariants$;
  readonly isLoading$ = this.employmentVariantStoreFacade.isLoading$;

  @tuiPure
  get createEmploymentVariantRoute(): string[] {
    return [PATH_NAME.create];
  }

  ngOnInit(): void {
    this.employmentVariantStoreFacade.load();
  }

  removeEmploymentVariant(employmentVariant: EmploymentVariant) {
    this.employmentVariantStoreFacade.remove(employmentVariant);
  }
}
