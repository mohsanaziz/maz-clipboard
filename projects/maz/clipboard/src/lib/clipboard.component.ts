import { Component, Inject, InjectionToken } from '@angular/core';

export const DONNEES: InjectionToken<string> = new InjectionToken<string>('DONNEES');

@Component({
  selector: 'maz-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss']
})
export class ClipboardComponent {
  constructor(@Inject(DONNEES) public message: string) {}
}
