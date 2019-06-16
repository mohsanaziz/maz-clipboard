import { AnimationTriggerMetadata, trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const clipboardAnimation: {
  readonly clipboardEtat: AnimationTriggerMetadata;
} = {
  clipboardEtat: trigger('etat', [
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
};

export enum CLIPBOARDANIMATION {
  INITIAL = 'initial',
  VISIBLE = 'visible'
}
