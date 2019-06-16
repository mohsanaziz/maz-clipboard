import { Component, Inject, InjectionToken } from '@angular/core';

import { CLIPBOARDANIMATION, clipboardAnimation } from './clipboard.animation';

export const DONNEES: InjectionToken<string> = new InjectionToken<string>('DONNEES');

@Component({
  selector: 'maz-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss'],
  animations: [clipboardAnimation.clipboardEtat]
})
export class ClipboardComponent {
  etat = CLIPBOARDANIMATION.INITIAL;

  constructor(@Inject(DONNEES) public message: string) {}
}
