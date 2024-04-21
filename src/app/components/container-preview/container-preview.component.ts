import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-container-preview',
  templateUrl: './container-preview.component.html',
  styleUrl: './container-preview.component.css'
})
export class ContainerPreviewComponent {
  @Input() max: number = 10;
  @Input() quantity: number | null = 10;
  @Input() transitionSpeed: number | null = 1;
  @Input() imageClass: string = '';
}
