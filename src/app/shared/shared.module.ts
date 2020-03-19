import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NumberOnlyDirective } from './directives/number-only.directive';
import { TextboxComponent } from './components/inputs/textbox/textbox.component';
import { TextareaComponent } from './components/inputs/textarea/textarea.component';

@NgModule({
  declarations: [NumberOnlyDirective, TextboxComponent, TextareaComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [NumberOnlyDirective, TextboxComponent]
})
export class SharedModule {}
