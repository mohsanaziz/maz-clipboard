import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClipboardComponent } from './clipboard.component';
import { ClipboardDirective } from './clipboard.directive';
import { ClipboardService } from './clipboard.service';

@NgModule({
  declarations: [ClipboardComponent, ClipboardDirective],
  providers: [ClipboardService],
  entryComponents: [ClipboardComponent],
  imports: [BrowserAnimationsModule, OverlayModule],
  exports: [ClipboardDirective]
})
export class ClipboardModule {}
