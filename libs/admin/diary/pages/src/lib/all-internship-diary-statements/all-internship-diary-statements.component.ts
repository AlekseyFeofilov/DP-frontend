import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { DiaryStoreFacade } from '@dp/admin/diary/store';
import { InternshipDiaryStatementsTableComponent } from '@dp/admin/diary/ui';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
  selector: 'dp-all-internship-diary-statements',
  standalone: true,
  imports: [
    CommonModule,
    InternshipDiaryStatementsTableComponent,
    TuiLoaderModule,
  ],
  templateUrl: './all-internship-diary-statements.component.html',
  styleUrl: './all-internship-diary-statements.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllInternshipDiaryStatementsComponent implements OnInit {
  private readonly diaryStoreFacade = inject(DiaryStoreFacade);

  readonly isLoading$ = this.diaryStoreFacade.isLoading$;

  ngOnInit(): void {
    this.diaryStoreFacade.load();
  }
}
