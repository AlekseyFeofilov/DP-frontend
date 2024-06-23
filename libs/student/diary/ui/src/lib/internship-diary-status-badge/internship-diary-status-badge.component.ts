import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InternshipDiaryStatementStatus } from '@dp/shared/statement/type';
import { TuiMapperPipeModule } from '@taiga-ui/cdk';
import { TuiBadgeModule } from '@taiga-ui/experimental';

@Component({
  selector: 'dp-internship-diary-status-badge',
  standalone: true,
  imports: [CommonModule, TuiMapperPipeModule, TuiBadgeModule],
  templateUrl: './internship-diary-status-badge.component.html',
  styleUrl: './internship-diary-status-badge.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternshipDiaryStatusBadgeComponent {
  @Input({ required: true }) status!: InternshipDiaryStatementStatus;

  getClassName(status: InternshipDiaryStatementStatus): string | null {
    switch (status) {
      case InternshipDiaryStatementStatus.OnVerification:
      case InternshipDiaryStatementStatus.SubmittedForSigning:
      case InternshipDiaryStatementStatus.Approved:
        return 'process';
      case InternshipDiaryStatementStatus.OnRevision:
        return 'declined';
      case InternshipDiaryStatementStatus.Rated:
        return 'final';
      default:
        return null;
    }
  }
}
