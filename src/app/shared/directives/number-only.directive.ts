import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  @HostListener('keypress', ['$event'])
  onKeyPress(e) {
    return e.charCode >= 48 && e.charCode <= 57;
  }

  constructor() {}
}
