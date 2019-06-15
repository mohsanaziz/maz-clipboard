import { NgModule } from '@angular/core';
import { ClipboardComponent } from './clipboard.component';
import { ClipboardDirective } from './clipboard.directive';

@NgModule({
  declarations: [ClipboardComponent, ClipboardDirective],
  imports: [],
  exports: [ClipboardComponent, ClipboardDirective]
})
export class ClipboardModule {}
