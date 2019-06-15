import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';

import { ClipboardComponent } from './clipboard.component';
import { ClipboardDirective } from './clipboard.directive';
import { ClipboardService } from './clipboard.service';

@NgModule({
  declarations: [ClipboardComponent, ClipboardDirective],
  providers: [ClipboardService],
  entryComponents: [ClipboardComponent],
  imports: [OverlayModule],
  exports: [ClipboardDirective]
})
export class ClipboardModule {}
