import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dpTableColumn]',
  standalone: true,
})
export class TableColumnDirective {
  constructor(public readonly templateRef: TemplateRef<any>) {}

  @Input('dpTableColumn') columnName!: string;
}
