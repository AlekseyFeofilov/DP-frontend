import { Injectable, inject } from '@angular/core';
import { AttachmentEntity } from '@dp/shared/types';
import { TuiSheetDialogService } from '@taiga-ui/addon-mobile';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';
import { ChatComponent } from './chat.component';

// TODO: перенести из ui
@Injectable()
export class ChatDialogService {
  private readonly tuiSheetDialogService = inject(TuiSheetDialogService);

  open(entity: AttachmentEntity): Observable<void> {
    return this.tuiSheetDialogService.open(
      new PolymorpheusComponent(ChatComponent),
      {
        label: 'Чат',
        stops: ['20rem'],
        data: {
          entity,
        },
      },
    );
  }
}
