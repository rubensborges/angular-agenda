import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export default class MenuItemsComponent {
  @Input() text: string = '';
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = '';
}
