import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector } from '@angular/core';

import { CLIPBOARDANIMATION } from './clipboard.animation';
import { ClipboardComponent, DONNEES } from './clipboard.component';
import { ClipboardConfig } from './clipboard.config';

@Injectable()
export class ClipboardService {
  constructor(@Inject(DOCUMENT) private document: any, private overlay: Overlay, private injector: Injector) {}

  /**
   * Fonction permettant de vérifier si l'élément est un input ou un textarea.
   *
   * @param element L'élément HTML à tester
   * @returns Si c'est un input ou un textarea
   */
  isInputOuTextArea(element: HTMLElement): boolean {
    return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
  }

  /**
   * Fonction permettant de créer un champ input.
   *
   * @param element L'élément HTML
   * @returns Un élément input affiché en dehors de la page.
   */
  creerInputElement(element: any): HTMLInputElement {
    const input = this.document.createElement('input');
    input.value = element.outerText;
    input.style.position = 'absolute';
    input.style.left = '-99999999px';
    this.document.body.appendChild(input);
    return input;
  }

  /**
   * Fonction permettant de supprimer un élément du DOM.
   *
   * @param element L'élément HTML à supprimer
   */
  supprimer(element: HTMLElement) {
    this.document.body.removeChild(element);
  }

  /**
   * Fonction copiant l'élément (input ou textarea) sélectionné dans le presse-papier.
   */
  copierPressePapier() {
    this.document.execCommand('copy');
  }

  /**
   * Fonction permettant d'afficher un message de notification.
   *
   * @param element L'élément HTML sur lequel doit être rataché la notification
   * @param config La configuration pour l'affichage
   */
  notifier(element: HTMLElement, config: ClipboardConfig) {
    const overlayRef = this.creerOverlay(element);

    const componentRef = overlayRef.attach(new ComponentPortal(ClipboardComponent, null, this.creerInjector(config.message)));
    componentRef.instance.etat = CLIPBOARDANIMATION.VISIBLE;

    setTimeout(() => overlayRef.dispose(), config.duree * 1000);
  }

  /**
   * Fonction qui crée l'overlay en haut à droite de l'élément.
   *
   * @param element L'élément HTML servant de point d'ancrage
   * @returns L'overlay crée
   */
  private creerOverlay(element: HTMLElement): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(element)
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

    return overlayRef;
  }

  /**
   * Fonction qui créée les informations à envoyer au composant.
   *
   * @param message Le message à afficher
   * @returns Un object contenant les informations à envoyer au composant
   */
  private creerInjector(message: string): PortalInjector {
    const injectorTokens = new WeakMap([[DONNEES, message]]);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
