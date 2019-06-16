import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { ClipboardConfig } from './clipboard.config';
import { ClipboardService } from './clipboard.service';

/**
 * Directive permettant de copier dans le presse-papier.
 *
 * @example
 * // 'config' doit être du type `ClipboardConfig`
 * <button [mazClipboard]="config">Texte qui va être copié</button>
 */
@Directive({
  selector: '[mazClipboard]'
})
export class ClipboardDirective {
  @Input('mazClipboard') config: string | ClipboardConfig;

  constructor(private clipboardService: ClipboardService, private el: ElementRef) {}

  /**
   * Fonction permettant de copier le texte de l'élément dans le presse-papier lors d'un clique.
   */
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

    if (input) {
      this.clipboardService.supprimer(input);
      input = undefined;
    }

    let configuration: ClipboardConfig = { message: '', duree: 2 };

    if (this.config instanceof Object) {
      configuration = { ...configuration, ...this.config };
    } else {
      configuration.message = this.config;
    }

    this.clipboardService.notifier(this.el.nativeElement, configuration);
  }
}
