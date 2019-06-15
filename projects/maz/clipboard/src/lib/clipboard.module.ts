import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';

import { ClipboardComponent } from './clipboard.component';
import { ClipboardDirective } from './clipboard.directive';

@NgModule({
  declarations: [ClipboardComponent, ClipboardDirective],
  entryComponents: [ClipboardComponent],
  imports: [OverlayModule],
  exports: [ClipboardComponent, ClipboardDirective]
})
export class ClipboardModule {}
