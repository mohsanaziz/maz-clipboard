import { Component, Input } from '@angular/core';

@Component({
  selector: 'maz-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss']
})
export class ClipboardComponent {
  @Input() text: string;
}
