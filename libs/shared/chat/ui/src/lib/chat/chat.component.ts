import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { ChatStoreFacade } from '@dp/shared/chat/store';
import { Message } from '@dp/shared/chat/types';
import {
  TuiLetModule,
  TuiMapperPipeModule,
  tuiMarkControlAsTouchedAndValidate,
} from '@taiga-ui/cdk';
import {
  TuiDialogContext,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiAutoColorModule,
  TuiAvatarModule,
  TuiButtonModule,
  TuiInitialsModule,
  tuiTooltipOptionsProvider,
} from '@taiga-ui/experimental';
import { TuiTextareaModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

export interface ChatDialogData {
  entityType: string;
  entityId: string;
}

@Component({
  selector: 'dp-chat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiAvatarModule,
    TuiAutoColorModule,
    TuiTextareaModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiInitialsModule,
    TuiLoaderModule,
    TuiLetModule,
    TuiTooltipModule,
    TuiMapperPipeModule,
  ],
  providers: [
    tuiTooltipOptionsProvider({
      icons: 'tuiIconInfo',
    }),
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  private readonly context =
    inject<TuiDialogContext<void, ChatDialogData>>(POLYMORPHEUS_CONTEXT);
  private readonly chatStoreFacade = inject(ChatStoreFacade);

  readonly messages$ = this.chatStoreFacade.messages$;
  readonly loadingMessagesIds$ = this.chatStoreFacade.loadingMessagesIds$;
  readonly errorMessagesIds$ = this.chatStoreFacade.errorMessagesIds$;
  readonly isLoading$ = this.chatStoreFacade.isLoading$;

  readonly control = new FormControl<string>('', {
    nonNullable: true,
    validators: [notEmptyString()],
  });

  ngOnInit(): void {
    this.chatStoreFacade.load(
      this.context.data.entityType,
      this.context.data.entityId,
    );
  }

  isMessageLoading(message: Message, loadingMessagesIds: string[]): boolean {
    return !!loadingMessagesIds?.includes(message.id);
  }

  isMessageFailed(
    message: Message,
    errorMessagesIds: string[] | null,
  ): boolean {
    return !!errorMessagesIds?.includes(message.id);
  }

  createMessage(): void {
    tuiMarkControlAsTouchedAndValidate(this.control);

    if (!this.control.valid) {
      return;
    }

    this.chatStoreFacade.create({
      entityType: this.context.data.entityType,
      entityId: this.context.data.entityId,
      content: this.control.value.trim(),
    });

    this.resetControl();
  }

  removeMessage(message: Message): void {
    this.chatStoreFacade.remove(message);
  }

  private resetControl(): void {
    this.control.setValue('');
    this.control.markAsUntouched();
  }
}

// TODO: вынести
export function notEmptyString(): ValidatorFn {
  return (control: AbstractControl<string>): { [key: string]: any } | null =>
    control.value?.replace(/\s/g, '').length ? null : { error: control.value };
}
