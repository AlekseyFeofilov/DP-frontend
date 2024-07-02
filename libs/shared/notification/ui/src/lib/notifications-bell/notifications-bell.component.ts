import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationStoreFacade } from '@dp/shared/notification/store';
import { Notification } from '@dp/shared/notification/types';
import { TuiActiveZoneModule, TuiObscuredModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import {
  TuiBadgeModule,
  TuiBadgedContentModule,
  TuiDataListWrapperModule,
} from '@taiga-ui/kit';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'dp-notifications-bell',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TuiDataListWrapperModule,
    TuiDataListModule,
    TuiDropdownModule,
    TuiButtonModule,
    TuiBadgedContentModule,
    TuiActiveZoneModule,
    TuiObscuredModule,
    TuiLoaderModule,
    TuiBadgeModule,
  ],
  templateUrl: './notifications-bell.component.html',
  styleUrl: './notifications-bell.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsBellComponent {
  private readonly notificationStoreFacade = inject(NotificationStoreFacade);

  readonly notifications$ = this.notificationStoreFacade.notifications$;
  readonly unreadNotificationsQuantity$ =
    this.notificationStoreFacade.unreadNotificationsQuantity$;
  readonly isLoading$ = this.notificationStoreFacade.isLoading$;

  private readonly openSubject$ = new BehaviorSubject(false);
  readonly open$ = this.openSubject$.pipe(
    tap(isOpened =>
      isOpened
        ? this.notificationStoreFacade.load()
        : this.notificationStoreFacade.loadUnreadQuantity(),
    ),
  );

  deleteNotification(notification: Notification): void {
    this.notificationStoreFacade.remove(notification);
  }

  onClick(): void {
    this.openSubject$.next(!this.openSubject$.value);
  }

  onObscured(obscured: boolean): void {
    if (obscured) {
      this.openSubject$.next(false);
    }
  }

  onActiveZone(active: boolean): void {
    this.openSubject$.next(active && this.openSubject$.value);
  }
}
