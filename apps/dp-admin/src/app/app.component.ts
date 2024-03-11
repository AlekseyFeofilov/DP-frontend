import { Component, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TUI_SANITIZER, TuiRootModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule, TuiSvgModule, TuiButtonModule],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  selector: 'dp-admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {}
