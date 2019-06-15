import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { ClipboardService } from './clipboard.service';

@Directive({
  selector: '[mazClipboard]'
})
export class ClipboardDirective {
  @Input('mazClipboard') message: string;

  constructor(private clipboardService: ClipboardService, private el: ElementRef) {}

  @HostListener('click')
  copier() {
    let input: HTMLInputElement;

    if (this.clipboardService.isInputOuTextArea(this.el.nativeElement)) {
      this.el.nativeElement.select();
    } else {
      input = this.clipboardService.creerInputElement(this.el.nativeElement);
      input.select();
    }

    this.clipboardService.copierPressePapier();

    this.clipboardService.notifier(this.el.nativeElement, this.message);

    if (input) {
      this.clipboardService.supprimer(input);
      input = undefined;
    }
  }
}
