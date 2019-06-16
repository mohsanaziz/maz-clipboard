import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, InjectionToken } from '@angular/core';

export const DONNEES: InjectionToken<string> = new InjectionToken<string>('DONNEES');

@Component({
  selector: 'maz-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss'],
  animations: [
    trigger('etat', [
      state('initial', style({ opacity: 0, transform: 'scale(0)' })),
      state('visible', style({ transform: 'scale(1)' })),
      transition(
        '* => visible',
        animate(
          '200ms cubic-bezier(0, 0, 0.2, 1)',
          keyframes([
            style({ opacity: 0, transform: 'scale(0)' }),
            style({ opacity: 0.5, transform: 'scale(0.5)' }),
            style({ opacity: 1, transform: 'scale(1)' })
          ])
        )
      )
    ])
  ]
})
export class ClipboardComponent {
  etat = 'initial';

  constructor(@Inject(DONNEES) public message: string) {}
}
