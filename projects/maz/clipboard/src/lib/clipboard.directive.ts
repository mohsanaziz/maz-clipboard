import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Injector, Input } from '@angular/core';

import { ClipboardComponent, CONTAINER_DATA } from './clipboard.component';

@Directive({
  selector: '[mazClipboard]'
})
export class ClipboardDirective {
  @Input('mazClipboard') text: string;

  constructor(@Inject(DOCUMENT) private document: Document, private el: ElementRef, private overlay: Overlay, private injector: Injector) {}

  @HostListener('click')
  copy() {
    let input: HTMLInputElement;

    if (this.el.nativeElement instanceof HTMLInputElement || this.el.nativeElement instanceof HTMLTextAreaElement) {
      this.el.nativeElement.select();
    } else {
      input = this.document.createElement('input');
      input.value = this.el.nativeElement.outerText;
      input.style.position = 'absolute';
      input.style.left = '-99999999px';
      this.document.body.appendChild(input);
      input.select();
    }
    document.execCommand('copy');

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el.nativeElement)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]);

    const overlayRef = this.overlay.create(
      new OverlayConfig({
        hasBackdrop: false,
        scrollStrategy: this.overlay.scrollStrategies.close(),
        positionStrategy
      })
    );

    overlayRef.attach(new ComponentPortal(ClipboardComponent, null, this.createInjector(this.text)));

    setTimeout(() => overlayRef.dispose(), 2000);

    if (input) {
      this.document.body.removeChild(input);
      input = undefined;
    }
  }

  private createInjector(text: string): PortalInjector {
    const injectorTokens = new WeakMap([[CONTAINER_DATA, text]]);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
