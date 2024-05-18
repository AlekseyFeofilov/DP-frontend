import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmploymentVariantsTableComponent } from '@dp/shared/employment-variant/ui';
import { PATH_NAME } from '@dp/student/shared/consts';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/experimental';

@Component({
  selector: 'dp-all-employment-variants',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EmploymentVariantsTableComponent,
    TuiButtonModule,
  ],
  templateUrl: './all-employment-variants.component.html',
  styleUrl: './all-employment-variants.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllEmploymentVariantsComponent {
  // private readonly companyStoreFacade = inject(CompanyStoreFacade);

  @tuiPure
  get createEmploymentVariantRoute(): string[] {
    return [PATH_NAME.create];
  }

  // ngOnInit(): void {
  //   this.companyStoreFacade.load();
  // }
}
