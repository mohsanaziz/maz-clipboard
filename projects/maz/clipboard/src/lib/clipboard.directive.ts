import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject } from '@angular/core';

@Directive({
  selector: '[mazClipboard]'
})
export class ClipboardDirective {
  constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document) {}

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

    if (input) {
      this.document.body.removeChild(input);
      input = undefined;
    }
  }
}
