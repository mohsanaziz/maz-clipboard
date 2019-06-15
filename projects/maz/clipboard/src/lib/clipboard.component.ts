import { Component, Inject, InjectionToken } from '@angular/core';

export const CONTAINER_DATA: InjectionToken<string> = new InjectionToken<string>('CONTAINER_DATA');

@Component({
  selector: 'maz-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss']
})
export class ClipboardComponent {
  constructor(@Inject(CONTAINER_DATA) public text: string) {}
}
